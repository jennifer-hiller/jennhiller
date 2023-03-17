<script setup lang="ts">
import { onAuthStateChanged } from "@firebase/auth";
import { onMounted, ref } from "vue";
import { auth, signInWithGoogle } from "../firebase";
const isLoggedIn = ref(false);
const handleSignout = () => {
  auth.signOut();
};
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});
</script>
<template>
  <main>
    <section class="splash">
      <h1>Account</h1>
    </section>
    <section class="contents">
      <p>
        <button v-if="isLoggedIn" @click="handleSignout">Log Out</button>
        <button v-else @click="signInWithGoogle">Log In With Google</button>
      </p>
    </section>
  </main>
</template>

<style></style>
