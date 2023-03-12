<script setup lang="ts">
import TheFeatures from "@/components/TheFeatures.vue";
</script>

<template>
  <main class="homepage">
    <section class="splash">
      <h1>Your Source for everything Jennifer</h1>
    </section>
    <section class="features">
      <TheFeatures />
    </section>
  </main>
</template>
<style lang="scss">
.homepage .splash {
  height: 40vh;
}
.features {
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
}
@include mq(medium) {
  .features {
    width: 800px;
    > div {
      width: 250px;
    }
  }
}
</style>
