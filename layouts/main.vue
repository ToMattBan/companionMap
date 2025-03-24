<template>
  <slot></slot>
  <div class="green-bar"></div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
html,
body {
  background-color: rgb(0 0 1);
  color: white;

  .green-bar {
    background: repeating-linear-gradient(90deg, #36e4da 0, #1de0b1 25%, #00dc82 50%, #1de0b1 75%, #36e4da);
    position: fixed;
    opacity: .5;
    bottom: -50px;
    filter: blur(100px);
    height: 100px;
    left: -50px;
    right: -50px;
  }
}
</style>