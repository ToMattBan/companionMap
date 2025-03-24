<template>
  <main>
    <h1>Our available games</h1>
    <ol class="game-list">
      <li v-for="game in availableGames" class="game-card">
        <NuxtLink :to="game.link">
          <LazyNuxtImg :src="game.headerImage" />
          <div>{{ game.name }}</div>
        </NuxtLink>
      </li>
    </ol>
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'main'
})

const availableGames = [
  {
    name: 'Arcania - Gothic 4',
    link: 'gothic4',
    headerImage: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/39690/capsule_616x353.jpg'
  }
]
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
  margin-top: 32px;
  margin-bottom: 64px;
}

.game-list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  padding: 0;
  list-style: none;
  margin: auto;
  background-color: #2d2c2c;
  padding: 12px;
  border-radius: 4px;
  width: 1000px;
  max-width: calc(100% - 24px - 16px);

  @media screen and (min-width: 401px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 801px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 1001px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.game-card {
  text-align: center;
  background-color: #3f5535;
  border-radius: 4px;

  a {
    display: flex;
    flex-direction: column;
    text-decoration: none;
  }

  div {
    padding: 10px 0;
    color: white;
    text-decoration: none;
  }

  img {
    width: 100%;
    border-radius: 4px 4px 0px 0px;
  }
}
</style>