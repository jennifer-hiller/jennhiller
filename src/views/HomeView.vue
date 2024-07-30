<script setup lang="ts">
import { onMounted } from 'vue';
import TheFeatures from "@/components/TheFeatures.vue";
onMounted(() => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Your Source for everything Jennifer Hiller",
      "url": "https://jennhiller.com",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.4,
        "reviewCount": 89
      }
    });
  document.head.appendChild(script);
});
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
