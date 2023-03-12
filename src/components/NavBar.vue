<script setup lang="ts">
import { auth } from "@/firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
const isAdmin = ref(false);
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      user.getIdTokenResult().then((idTokenResult) => {
        isAdmin.value = idTokenResult.claims.role === "admin";
      });
    } else {
      isAdmin.value = false;
    }
  });
});
</script>
<template>
  <nav class="navbar">
    <ul class="navbar__links">
      <li class="navbar__item">
        <RouterLink class="navbar__link" to="/">Home</RouterLink>
      </li>
      <li class="navbar__item">
        <RouterLink class="navbar__link" to="/about">About</RouterLink>
      </li>
      <li class="navbar__item">
        <RouterLink class="navbar__link" to="/blog">Blog</RouterLink>
      </li>
      <li class="navbar__item">
        <RouterLink class="navbar__link" to="/account">Account</RouterLink>
      </li>
      <li class="navbar__item" v-if="isAdmin">
        <RouterLink class="navbar__link" to="/admin">Admin</RouterLink>
      </li>
    </ul>
  </nav>
</template>
