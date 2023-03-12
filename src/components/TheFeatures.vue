<script setup lang="ts">
import FeaturesItem from "./FeaturesItem.vue";
import IconHTML5Vue from "./icons/IconHTML5.vue";
import IconSassVue from "./icons/IconSass.vue";
import IconBootstrapVue from "./icons/IconBootstrap.vue";
import IconTypeScriptVue from "./icons/IconTypeScript.vue";
import IconJavaScriptVue from "./icons/IconJavaScript.vue";
import IconReactVue from "./icons/IconReact.vue";
import IconIntelliJVue from "./icons/IconIntelliJ.vue";
import IconVSCodeVue from "./icons/IconVSCode.vue";
import IconSublimeVue from "./icons/IconSublime.vue";
</script>
<template>
  <FeaturesItem>
    <template #icon1>
      <IconHTML5Vue />
    </template>
    <template #icon2>
      <IconSassVue />
    </template>
    <template #icon3>
      <IconBootstrapVue />
    </template>
    <template #heading>Front End</template>
    I feel comfortable working on the front-end, going from pure CSS & HTML5 to LESS, Sass, or Bootstrap.
  </FeaturesItem>
  <FeaturesItem>
    <template #icon1>
      <IconTypeScriptVue />
    </template>
    <template #icon2>
      <IconJavaScriptVue />
    </template>
    <template #icon3>
      <IconReactVue />
    </template>
    <template #heading>Logic</template>
    I've worked in raw JavaScript, ES6, and TypeScript, but also libraries such as JQuery, ReactJS, and CanJS!
  </FeaturesItem>
  <FeaturesItem>
    <template #icon1>
      <IconIntelliJVue />
    </template>
    <template #icon2>
      <IconVSCodeVue />
    </template>
    <template #icon3>
      <IconSublimeVue />
    </template>
    <template #heading>Tools</template>
    So many great tools out there, including Git, Gulp, NPM, and so on!
  </FeaturesItem>
</template>

<style lang="scss">
.feature__item {
  padding: 1.5rem 1rem;
  h3 {
    font-size: 2rem;
    text-align: center;
  }
  ul {
    display: flex;
    list-style: none;
    justify-content: space-between;
    padding: 10px 1rem;
  }
  svg {
    height: 60px;
    width: 60px;
  }
  p {
    font-size: 1rem;
  }
}
</style>
