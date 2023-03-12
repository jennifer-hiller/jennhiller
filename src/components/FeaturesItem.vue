<template>
  <div class="feature__item">
    <h3>
      <slot name="heading"></slot>
    </h3>
    <ul>
      <li>
        <slot name="icon1"></slot>
      </li>
      <li>
        <slot name="icon2"></slot>
      </li>
      <li>
        <slot name="icon3"></slot>
      </li>
    </ul>
    <p class="details">
      <slot></slot>
    </p>
  </div>
</template>
