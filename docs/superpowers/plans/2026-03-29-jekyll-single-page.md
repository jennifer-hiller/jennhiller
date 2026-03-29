# Jekyll Single-Page Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Vite/React portfolio with a single-page Jekyll site that preserves the current design and section flow while moving content into Jekyll templates, data files, Sass, and light vanilla JavaScript.

**Architecture:** Build a native Jekyll site with one `index.html` entrypoint, a `default` layout, section includes, YAML data files, and a small Sass and JavaScript asset pipeline. Keep the existing React source available as reference until the Jekyll page reaches visual and functional parity, then remove the obsolete build path.

**Tech Stack:** Jekyll, Liquid, YAML data files, Sass, vanilla JavaScript, Ruby Bundler

---

### Task 1: Scaffold Jekyll Build Files

**Files:**
- Create: `_config.yml`
- Create: `Gemfile`
- Modify: `README.md`

- [ ] **Step 1: Write the failing build command expectation**

Document that `bundle exec jekyll build` cannot run yet because the repo does not contain Jekyll configuration or a Gemfile.

Expected failure:

```text
Could not locate Gemfile
```

- [ ] **Step 2: Verify the current repo has no Jekyll scaffold**

Run: `rg --files -g '_config.yml' -g 'Gemfile'`
Expected: no output

- [ ] **Step 3: Create `_config.yml` with the baseline Jekyll settings**

```yml
title: Portfolio
description: Personal portfolio website
url: ""
baseurl: ""
markdown: kramdown
permalink: pretty
sass:
  sass_dir: assets/css
  style: compressed
collections_dir: .
exclude:
  - node_modules
  - src
  - package.json
  - postcss.config.mjs
  - vite.config.ts
  - README.old.md
```

Keep the exclude list aligned with the final cleanup decision. If some old files remain in the repo for reference, exclude them from Jekyll output rather than deleting them early.

- [ ] **Step 4: Create `Gemfile` for local Jekyll development**

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.4"
gem "webrick", "~> 1.8"
```

- [ ] **Step 5: Update `README.md` to describe the Jekyll workflow**

Replace the Vite instructions with:

```md
## Running locally

1. `bundle install`
2. `bundle exec jekyll serve`

## Build

Run `bundle exec jekyll build`
```

- [ ] **Step 6: Run the first dependency install**

Run: `bundle install`
Expected: Bundler installs `jekyll` and `webrick` successfully

- [ ] **Step 7: Commit the scaffold**

```bash
git add _config.yml Gemfile README.md
git commit -m "chore: scaffold jekyll build files"
```

### Task 2: Create The Jekyll Page Shell

**Files:**
- Create: `_layouts/default.html`
- Create: `index.html`

- [ ] **Step 1: Write the first failing page assembly check**

Plan to run `bundle exec jekyll build` after adding `index.html` and `_layouts/default.html`.

Expected current failure:

```text
Layout 'default' requested in index.html does not exist
```

- [ ] **Step 2: Create `_layouts/default.html`**

Use a semantic document shell:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ page.title | default: site.title }}</title>
    <meta name="description" content="{{ page.description | default: site.description }}">
    <link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
  </head>
  <body>
    {{ content }}
    <script src="{{ '/assets/js/site.js' | relative_url }}" defer></script>
  </body>
</html>
```

Include the existing favicon and webmanifest references from the current `public/` assets as part of this layout.

- [ ] **Step 3: Create `index.html` with front matter and include placeholders**

```html
---
layout: default
title: Portfolio
description: Personal portfolio website
---

{% include header.html %}
<main>
  {% include hero.html %}
  {% include about.html %}
  {% include skills.html %}
  {% include projects.html %}
  {% include contact.html %}
</main>
{% include footer.html %}
```

This step should intentionally fail until the includes exist.

- [ ] **Step 4: Run the build to confirm include-related failures**

Run: `bundle exec jekyll build`
Expected: fail with missing include errors such as `Could not locate the included file 'header.html'`

- [ ] **Step 5: Commit the shell**

```bash
git add _layouts/default.html index.html
git commit -m "feat: add jekyll page shell"
```

### Task 3: Model Repeated Content In Data Files

**Files:**
- Create: `_data/site.yml`
- Create: `_data/navigation.yml`
- Create: `_data/skills.yml`
- Create: `_data/projects.yml`

- [ ] **Step 1: Extract current repeated content from the React components**

Use:
- `src/app/components/Header.tsx`
- `src/app/components/Hero.tsx`
- `src/app/components/About.tsx`
- `src/app/components/Skills.tsx`
- `src/app/components/Projects.tsx`
- `src/app/components/Contact.tsx`
- `src/app/components/Footer.tsx`

Do not invent new content during migration. Preserve the existing placeholder copy unless the user later asks for editorial changes.

- [ ] **Step 2: Create `_data/navigation.yml`**

```yml
- label: Home
  id: hero
- label: About
  id: about
- label: Skills
  id: skills
- label: Projects
  id: projects
- label: Contact
  id: contact
```

- [ ] **Step 3: Create `_data/site.yml`**

Include brand text, hero copy, contact info, social links, and footer copy in one structured file, for example:

```yml
brand:
  name: Portfolio
hero:
  headline_prefix: "Hi, I'm"
  headline_name: "Your Name"
  subtitle: "Web Developer & Site Creator"
  description: "I craft beautiful, responsive websites using HTML, CSS, and JavaScript."
contact:
  email: "your.email@example.com"
  phone: "+1 (555) 123-4567"
  location: "San Francisco, CA"
social:
  github: "https://github.com"
  linkedin: "https://linkedin.com"
```

Include image URLs used by the hero and about sections in the same file if they are not section-specific enough to warrant their own data file.

- [ ] **Step 4: Create `_data/skills.yml`**

Represent each skill card with its name, level, description, visual gradient class token, and technology tags.

- [ ] **Step 5: Create `_data/projects.yml`**

Represent each project card with title, description, image URL, tag list, live URL, and GitHub URL.

- [ ] **Step 6: Validate YAML structure visually**

Run: `ruby -e "require 'yaml'; %w[_data/site.yml _data/navigation.yml _data/skills.yml _data/projects.yml].each { |f| YAML.load_file(f) }"`
Expected: no output and exit code `0`

- [ ] **Step 7: Commit the data layer**

```bash
git add _data/site.yml _data/navigation.yml _data/skills.yml _data/projects.yml
git commit -m "feat: add portfolio data files"
```

### Task 4: Port Section Markup Into Includes

**Files:**
- Create: `_includes/header.html`
- Create: `_includes/hero.html`
- Create: `_includes/about.html`
- Create: `_includes/skills.html`
- Create: `_includes/projects.html`
- Create: `_includes/contact.html`
- Create: `_includes/footer.html`

- [ ] **Step 1: Create `_includes/header.html` with Liquid-driven navigation**

Use semantic markup and loop over `site.data.navigation`:

```html
<header class="site-header" data-site-header>
  <nav class="container nav">
    <a class="brand" href="#hero">{{ site.data.site.brand.name }}</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>
      <span class="sr-only">Toggle navigation</span>
    </button>
    <div class="nav-links nav-links--desktop">
      {% for item in site.data.navigation %}
        <a href="#{{ item.id }}">{{ item.label }}</a>
      {% endfor %}
    </div>
    <div id="mobile-menu" class="nav-links nav-links--mobile" hidden data-mobile-menu>
      {% for item in site.data.navigation %}
        <a href="#{{ item.id }}">{{ item.label }}</a>
      {% endfor %}
    </div>
  </nav>
</header>
```

- [ ] **Step 2: Create `_includes/hero.html`**

Port the hero structure and use `site.data.site.hero` values for the copy and links.

- [ ] **Step 3: Create `_includes/about.html`**

Keep the section ID `about`, preserve the two-column layout, and render the highlight items either from `_data/site.yml` or inline from a small Liquid array if that is cleaner.

- [ ] **Step 4: Create `_includes/skills.html`**

Loop over `site.data.skills` and render progress bars with inline width styles:

```html
<div class="skill-bar">
  <span class="skill-bar__fill" style="width: {{ skill.level }}%"></span>
</div>
```

- [ ] **Step 5: Create `_includes/projects.html`**

Loop over `site.data.projects` and keep the two-button action row for live demo and source code.

- [ ] **Step 6: Create `_includes/contact.html`**

Preserve the current two-column structure. Keep the form fields in markup, but do not add backend submission logic.

- [ ] **Step 7: Create `_includes/footer.html`**

Use Liquid for the current year:

```liquid
© {{ 'now' | date: '%Y' }} {{ site.data.site.brand.name }}. All rights reserved.
```

- [ ] **Step 8: Run the build to ensure all includes resolve**

Run: `bundle exec jekyll build`
Expected: success and generated `_site/index.html`

- [ ] **Step 9: Commit the includes**

```bash
git add _includes/header.html _includes/hero.html _includes/about.html _includes/skills.html _includes/projects.html _includes/contact.html _includes/footer.html
git commit -m "feat: port portfolio sections to jekyll includes"
```

### Task 5: Rebuild The Visual System In Sass

**Files:**
- Create: `assets/css/main.scss`
- Create: `assets/css/_variables.scss`
- Create: `assets/css/_base.scss`
- Create: `assets/css/_layout.scss`
- Create: `assets/css/_components.scss`

- [ ] **Step 1: Map the core visual tokens from the current React/Tailwind implementation**

Reference:
- `src/styles/theme.css`
- the utility usage in each `src/app/components/*.tsx` file

Pull forward only the tokens that are actually used by the live portfolio sections.

- [ ] **Step 2: Create `assets/css/_variables.scss`**

Define color, spacing, shadow, radius, and breakpoint variables such as:

```scss
$color-text: #111827;
$color-muted: #4b5563;
$color-surface: #ffffff;
$color-surface-alt: #f8fafc;
$gradient-primary: linear-gradient(135deg, #2563eb, #9333ea);
$shadow-card: 0 20px 40px rgba(15, 23, 42, 0.12);
$radius-card: 1.5rem;
$bp-md: 768px;
$bp-lg: 1024px;
```

- [ ] **Step 3: Create `assets/css/_base.scss`**

Include reset-ish defaults, typography, `scroll-behavior`, image defaults, form field defaults, and utility helpers like `.container`, `.sr-only`, and section spacing primitives.

- [ ] **Step 4: Create `assets/css/_layout.scss`**

Implement page-level grids and responsive section wrappers for hero, about, skills, projects, contact, and footer.

- [ ] **Step 5: Create `assets/css/_components.scss`**

Implement buttons, cards, tags, progress bars, icon shells, header blur treatment, mobile menu, and project hover styles.

- [ ] **Step 6: Create `assets/css/main.scss`**

Wire the partials together with front matter so Jekyll compiles the file:

```scss
---
---

@import "variables";
@import "base";
@import "layout";
@import "components";
```

- [ ] **Step 7: Run the build and inspect the CSS artifact**

Run: `bundle exec jekyll build`
Expected: generated CSS at `_site/assets/css/main.css`

- [ ] **Step 8: Commit the Sass layer**

```bash
git add assets/css/main.scss assets/css/_variables.scss assets/css/_base.scss assets/css/_layout.scss assets/css/_components.scss
git commit -m "feat: add jekyll sass styling"
```

### Task 6: Recreate Lightweight Behavior In Vanilla JavaScript

**Files:**
- Create: `assets/js/site.js`

- [ ] **Step 1: Define the required behaviors from the React app**

The only required behaviors for parity are:
- mobile menu toggle
- close mobile menu after link selection
- optional smooth-scroll enhancement for same-page anchor links

Do not port demo-only React state patterns that are unnecessary in plain DOM code.

- [ ] **Step 2: Create `assets/js/site.js`**

Use a small DOM script:

```js
const toggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

if (toggle && mobileMenu) {
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    mobileMenu.hidden = expanded;
  });
}
```

Add event handlers to mobile nav links so the menu closes after selection. If smooth scrolling is implemented in CSS and behaves correctly, keep the JavaScript minimal and do not double-handle navigation.

- [ ] **Step 3: Build and smoke-test the behavior**

Run: `bundle exec jekyll build`
Expected: success

Then run: `bundle exec jekyll serve`
Expected: local server starts without JavaScript asset errors

- [ ] **Step 4: Commit the behavior layer**

```bash
git add assets/js/site.js
git commit -m "feat: add portfolio interaction script"
```

### Task 7: Preserve Existing Metadata And Static Assets

**Files:**
- Modify: `_layouts/default.html`
- Modify: any asset paths needed for favicons and manifest references
- Reuse: `public/favicon.ico`
- Reuse: `public/favicon-16x16.png`
- Reuse: `public/favicon-32x32.png`
- Reuse: `public/apple-touch-icon.png`
- Reuse: `public/android-chrome-192x192.png`
- Reuse: `public/android-chrome-512x512.png`
- Reuse: `public/site.webmanifest`
- Reuse: `public/browserconfig.xml`
- Reuse: `public/safari-pinned-tab.svg`

- [ ] **Step 1: Identify the homepage metadata that must survive migration**

Review the current root HTML and any recent homepage metadata changes before rewriting the `<head>` section completely.

- [ ] **Step 2: Update `_layouts/default.html` to include all static metadata references**

Include favicon, manifest, theme-color, canonical placeholder if applicable, and any JSON-LD already intended for the homepage.

- [ ] **Step 3: Verify all static assets resolve in the generated site**

Run: `bundle exec jekyll build`
Expected: asset references in `_site/index.html` point to valid files served from the site root or copied asset paths

- [ ] **Step 4: Commit metadata preservation**

```bash
git add _layouts/default.html public
git commit -m "feat: preserve portfolio metadata and static assets"
```

### Task 8: Verify Visual And Functional Parity Before Cleanup

**Files:**
- No new source files required unless fixes are needed

- [ ] **Step 1: Run the full local site**

Run: `bundle exec jekyll serve`
Expected: site is available locally without build errors

- [ ] **Step 2: Manually verify the single-page flow**

Check:
- header stays fixed and readable
- anchor links reach the correct sections
- mobile menu opens and closes correctly
- hero, about, skills, projects, contact, and footer match the existing order and structure
- project cards, buttons, gradients, and section spacing are visually close to the React version

- [ ] **Step 3: Verify responsive behavior**

Check at minimum:
- mobile width around `390px`
- tablet width around `768px`
- desktop width `1280px+`

- [ ] **Step 4: Fix any parity regressions found during review**

Modify only the Sass, includes, or data files needed to close the gaps. Avoid refactoring unrelated content during this pass.

- [ ] **Step 5: Commit parity fixes**

```bash
git add _includes _layouts assets/css assets/js _data
git commit -m "fix: align jekyll site with portfolio design"
```

### Task 9: Retire The Old Vite/React Build Path

**Files:**
- Delete or archive: `src/`
- Delete: `vite.config.ts`
- Delete: `postcss.config.mjs`
- Modify: `package.json`
- Modify: `_config.yml`
- Modify: `README.md`

- [ ] **Step 1: Decide whether to delete or archive the old frontend source**

Preferred: delete the old default build path once parity is verified.

Safer fallback: move the old app into an archive directory and exclude it from Jekyll output if you want a reference snapshot.

- [ ] **Step 2: Remove unused frontend tooling from `package.json`**

Either delete `package.json` entirely if Node tooling is no longer needed, or reduce it to only the scripts that remain intentionally supported. Do not leave a misleading Vite build command in place.

- [ ] **Step 3: Remove obsolete frontend files**

Delete only after the Jekyll site is confirmed working:
- `src/app/`
- `src/main.tsx`
- `src/styles/`
- `vite.config.ts`
- `postcss.config.mjs`
- any other React-only entry files

- [ ] **Step 4: Update `_config.yml` and `README.md` after cleanup**

Make sure exclude lists and local development instructions reflect the final repo state.

- [ ] **Step 5: Run the final clean build**

Run: `bundle exec jekyll build`
Expected: success with no dependency on Node or Vite

- [ ] **Step 6: Commit the retirement**

```bash
git add -A
git commit -m "refactor: replace vite portfolio with jekyll site"
```

### Task 10: Final Verification And Handoff

**Files:**
- Modify: `README.md` if final notes are still needed

- [ ] **Step 1: Run the final verification commands**

Run:

```bash
bundle exec jekyll build
bundle exec jekyll serve --detach
```

Expected:
- build succeeds
- serve command starts the site successfully

- [ ] **Step 2: Record the manual verification checklist in the final handoff**

Include:
- tested viewport sizes
- checked anchor navigation
- checked mobile menu behavior
- confirmed static asset references

- [ ] **Step 3: Stop the detached server if one was started**

Use the process instructions emitted by Jekyll, or terminate the PID directly after verification.

- [ ] **Step 4: Commit any final docs adjustments**

```bash
git add README.md
git commit -m "docs: finalize jekyll portfolio workflow"
```
