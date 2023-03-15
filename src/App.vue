<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import Navbar from "./components/NavBar.vue";
import { appCheck } from "./firebase";
import { getToken } from "firebase/app-check";
const token = ref("");
const tokenError = ref<any>(null);
getToken(appCheck)
  .then((tokenObj) => {
    token.value = tokenObj.token;
  })
  .catch((error) => {
    tokenError.value = error;
  });
</script>

<template>
  <div v-if="tokenError">Not authorized</div>
  <div v-else>
    <header class="page__header">
      <h2 class="brand-name">
        <a class="brand-name__link" href="/">
          <span class="brand-name__text">Jennifer Hiller</span>
        </a>
      </h2>
      <input type="checkbox" class="navbar__toggle" id="navbar__toggle" />
      <Navbar />
      <label for="navbar__toggle" class="navbar__toggle__label">
        <span class="navbar__toggle__hamburger">Toggle Nav</span>
      </label>
    </header>
    <RouterView />
    <footer class="footer">
      <h6>
        &copy;{{ new Date().getFullYear() }}
        <a href="https://www.catloafsoft.com/" target="_blank">
          Catloaf Software, LLC
        </a>
      </h6>
    </footer>
  </div>
</template>

<style lang="scss">
.footer {
  font-size: 0.85rem;
  padding: 1rem 0;
}
.contents {
  padding: 1.5rem;
}
.page__header {
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  text-align: center;
  width: 100%;
  z-index: 999;
}
.navbar {
  &__toggle {
    display: none;
    &__label {
      align-items: center;
      display: flex;
      height: 100%;
      left: 0;
      margin-left: 1em;
      position: absolute;
      top: 0;
    }
    &__hamburger {
      text-indent: -999999px;
      &,
      &::before,
      &::after {
        background: map-get($colors, "white");
        border-radius: 2px;
        display: block;
        height: 2px;
        position: relative;
        transition: all 0.5s ease-out;
        width: 1.25em;
      }
      &::before,
      &::after {
        content: "";
        position: absolute;
      }
      &::before {
        bottom: 7px;
      }
      &::after {
        top: 7px;
      }
    }
    &:checked ~ {
      .navbar {
        display: flex;
      }
      .navbar__toggle__label .navbar__toggle__hamburger {
        background-color: transparent;
        &::before,
        &::after {
          bottom: auto;
          top: 0;
        }
        &::before {
          transform: rotate(45deg);
        }
        &::after {
          transform: rotate(-45deg);
        }
      }
    }
  }
}
.brand-name {
  &__text {
    text-transform: uppercase;
    font-family: $brand-font;
    font-size: 2.25rem;
    padding-left: 0.25em;
  }
  &__link {
    &:link,
    &:visited {
      color: map-get($colors, "black");
      align-items: center;
      text-decoration: none;
    }
    &:hover,
    &:active {
      color: $secondary-color;
      text-decoration: none;
    }
  }
}
.blog {
  &__entry {
    padding-top: 1.5rem;
    &:first-child {
      padding: 0;
    }
    &__title {
      font-size: 2rem;
      padding-bottom: 0.5rem;
    }
    &__date {
      color: lighten(map-get($colors, "black"), 50%);
      font-size: 0.75rem;
      padding-bottom: 0.5rem;
    }
  }
}
.splash {
  background: url(@/assets/office-building-2022-12-15-19-37-04-utc.jpeg)
    no-repeat;
  background-size: cover;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.splash h1 {
  font-size: 2rem;
  font-weight: bold;
  color: var(--white);
  padding: 0 3rem;
  text-shadow: 1px 1px 2px gray;
}
.navbar {
  -webkit-animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  align-items: center;
  background-color: $nav-bg;
  display: none;
  left: 0;
  height: 100vh;
  position: absolute;
  text-align: left;
  top: 0;
  width: 100vw;
  &__links {
    list-style: none;
    margin-inline: auto;
  }
  &__item {
    margin-bottom: 1em;
    margin-left: 1em;
    a.navbar__link.router-link-active {
      color: $primary-color;
    }
  }
  a.navbar__link {
    color: $secondary-color;
    font-size: 1.2rem;
    position: relative;
    text-decoration: none;
    text-transform: uppercase;
    &:hover,
    &:active {
      text-decoration: none;
    }
  }
  &__toggle {
    display: none;
    &__label {
      align-items: center;
      display: flex;
      height: 100%;
      left: 0;
      margin-left: 1em;
      position: absolute;
      top: 0;
    }
    &__hamburger {
      text-indent: -999999px;
      &,
      &::before,
      &::after {
        background: $primary-color;
        border-radius: 2px;
        display: block;
        height: 2px;
        position: relative;
        transition: all 0.5s ease-out;
        width: 1.25em;
      }
      &::before,
      &::after {
        content: "";
        position: absolute;
      }
      &::before {
        bottom: 7px;
      }
      &::after {
        top: 7px;
      }
    }
    &:checked ~ {
      .navbar {
        display: flex;
      }
      .navbar__toggle__label .navbar__toggle__hamburger {
        background-color: transparent;
        &::before,
        &::after {
          bottom: auto;
          top: 0;
        }
        &::before {
          transform: rotate(45deg);
        }
        &::after {
          transform: rotate(-45deg);
        }
      }
    }
  }
}
@include mq(medium) {
  .footer {
    width: 800px;
    margin: 0 auto;
  }
  .contents {
    width: 800px;
    margin: 0 auto;
    padding-right: 0;
    padding-left: 0;
  }
  .page__header {
    align-items: center;
    box-shadow: 0 0.1rem 0.25rem gray;
    display: flex;
    justify-content: space-between;
    padding: 0.25em;
    width: 100%;
    mix-blend-mode: hard-light;
  }
  .brand-name {
    &__link {
      display: flex;
    }
  }
  .navbar {
    -webkit-animation: none;
    animation: none;
    background-color: transparent;
    display: flex;
    height: auto;
    position: static;
    width: auto;
    &__link {
      color: $primary-color;
      &::after {
        content: "";
        display: block;
        height: 5px;
        background: map-get($colors, "black");
        position: absolute;
        bottom: -0.75em;
        left: 0;
        right: 0;
        transform: scale(0, 1);
        transition: transform ease-in-out 250ms;
      }
      &:hover,
      &--active {
        color: darken($secondary-color, 25%);
        &::after {
          transform: scale(1, 1);
        }
      }
    }
    &__links {
      display: flex;
      margin-inline: 0;
    }
    &__toggle {
      display: none;
      &__label {
        display: none;
      }
    }
    &__item {
      margin: 0;
      padding: 0 2em;
    }
  }
  @media (prefers-color-scheme: dark) {
    .navbar {
      &__link::after {
        background-color: map-get($colors, "white");
      }
      background-color: $nav-bg-dark;
    }
  }
}
</style>
