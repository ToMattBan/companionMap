<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import mapUtils from '@/utils/map';

import adanosMarkers from '@/assets/markers/gothic_4/adanos'
import beliarMarkers from '@/assets/markers/gothic_4/beliar'
import innosMarkers from '@/assets/markers/gothic_4/innos'

const attribuitions: string[] = [
  'Maps from <a href="https://www.worldofgothic.com/">World of Gothic</a>',
  'Markers from <a href="https://www.xboxachievements.com/forum/topic/239955-arcania-gothic-4-collectables-guide/">Xbox Achievements</a>',
  'Made with <a href="https://leafletjs.com">Leaflet</a>'
];

const iconSize: L.PointTuple = [25, 25];

onMounted(async () => {
  mapUtils.initMap();
  mapUtils.setTileMap('gothic_4', attribuitions.join(' | '));

  const adanosIcon = mapUtils.createIcon('gothic_4', 'adanos.webp', iconSize, 'adanos-icon');
  adanosMarkers.forEach(marker => mapUtils.createMarker(marker.coord, adanosIcon, marker.title)); 
  
  const beliarIcon = mapUtils.createIcon('gothic_4', 'beliar.webp', iconSize, 'beliar-icon');
  beliarMarkers.forEach(marker => mapUtils.createMarker(marker.coord, beliarIcon, marker.title));

  const innosIcon = mapUtils.createIcon('gothic_4', 'innos.webp', iconSize, 'innos-icon');
  innosMarkers.forEach(marker => mapUtils.createMarker(marker.coord, innosIcon, marker.title)); 
})
</script>

<style scoped>
#map {
  background-color: black;
}
</style>