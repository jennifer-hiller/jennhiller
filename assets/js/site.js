const toggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

if (toggle && mobileMenu) {
  const setExpanded = (expanded) => {
    toggle.setAttribute("aria-expanded", String(expanded));
    mobileMenu.hidden = !expanded;
  };

  setExpanded(false);

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    setExpanded(!expanded);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setExpanded(false));
  });
}

document.querySelectorAll("[data-contact-form]").forEach((form) => {
  const status = form.querySelector("[data-form-status]");
  const submitButton = form.querySelector("[data-submit-button]");

  const setStatus = (message, type = "") => {
    if (!status) return;
    status.textContent = message;
    status.classList.remove("is-success", "is-error");
    if (type) {
      status.classList.add(type);
    }
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const accessKey = form.querySelector('input[name="access_key"]')?.value ?? "";
    if (!accessKey || accessKey === "REPLACE_WITH_WEB3FORMS_ACCESS_KEY") {
      setStatus("Add your Web3Forms access key in _data/site.yml before using the form.", "is-error");
      return;
    }

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      setStatus("Sending your message...");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json();

      if (response.status === 200 && json.success) {
        form.reset();
        setStatus("Message sent. I will get back to you soon.", "is-success");
        return;
      }

      const message = json?.body?.message || json?.message || "Something went wrong. Please try again.";
      setStatus(message, "is-error");
    } catch (_error) {
      setStatus("Could not send the message right now. Please try again later.", "is-error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }
    }
  });
});
