<template>
  <img src="../assets/gothic_4/icons/adanos.webp">
</template>

<script lang="ts" setup>
import mapUtils from '../utils/map';

const attribuitions: string[] = [
  'Maps from <a href="https://www.worldofgothic.com/">World of Gothic</a>',
  'Markers from <a href="https://www.xboxachievements.com/forum/topic/239955-arcania-gothic-4-collectables-guide/">Xbox Achievements</a>',
  'Made with <a href="https://leafletjs.com">Leaflet</a>'
];

const iconSize: L.PointTuple = [25, 25];

onMounted(async () => {
  /* mapUtils.initMap();
  mapUtils.setTileMap('gothic_4', attribuitions.join(' | '));

  const icons = {
    adanos: mapUtils.createIcon('gothic_4', 'adanos.webp', iconSize, 'adanos-icon'),
    innos: mapUtils.createIcon('gothic_4', 'innos.webp', iconSize, 'innos-icon'),
    beliar: mapUtils.createIcon('gothic_4', 'beliar.webp', iconSize, 'beliar-icon')
  } */
})
</script>

<style scoped>
#map {
  background-color: black;
}
</style>