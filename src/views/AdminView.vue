<script setup lang="ts">
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import router from "../router/index";
async function submitHandler(e: Event) {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const formObject: { [key: string]: string | Date } = {};
  for (let [key, value] of formData.entries()) {
    formObject[key] = value as string;
  }
  formObject.date = new Date();
  try {
    const docRef = await addDoc(collection(db, "blog"), formObject);
    console.log("Document written with ID: ", docRef.id);
    router.replace("/blog/" + docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
</script>
<template>
  <main>
    <section class="splash">
      <h1>Admin</h1>
    </section>
    <section class="contents">
      <h3>New Blog Entry</h3>
      <form @submit="submitHandler" class="blog__form">
        <p>
          <label for="title">Title</label>
          <input type="text" name="title" class="blog__form-title" id="title" />
        </p>
        <p>
          <label for="contents">Contents</label>
          <textarea name="contents" class="blog__form-contents" id="contents" />
        </p>
        <p>
          <button>Submit</button>
        </p>
      </form>
    </section>
  </main>
</template>
<style lang="scss">
.blog {
  &__form {
    border: 1px solid map-get($colors, "black");
    border-radius: 3px;
    padding: 1.5rem;
    &-title,
    &-contents {
      display: block;
      font-family: $primary-font;
      font-size: 1.5rem;
      padding: 1.5rem;
      width: 100%;
    }
    &-contents {
      height: 30vh;
    }
  }
}
</style>
