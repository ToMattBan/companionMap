<template>
  <main>
    <nav>
      <ol>
        <li><NuxtLink to="/gothic4">Map</NuxtLink></li>
        <li><NuxtLink to="/gothic4/achievements">Achievements Guide</NuxtLink></li>
      </ol>
    </nav>
    
    <section>
      <slot />
    </section>
  </main>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
main {
  position: relative;
  display: grid;
  grid-template-columns: 300px auto;
  gap: 12px;
  overflow: hidden;
}

nav {
  border-right: solid 1px black;
  height: 100vh;
}
</style>