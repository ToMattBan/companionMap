<template>
  <div id="map" class="gothic_4_map"></div>
</template>

<script lang="ts" setup>
import type { IMarkers } from '~/interfaces/map';
import mapUtils from '@/utils/map';

import markAdanos from '@/assets/markers/gothic_4/adanos'
import markBeliar from '@/assets/markers/gothic_4/beliar'
import markInnos from '@/assets/markers/gothic_4/innos'

const attribuitions: string[] = [
  'Maps from <a href="https://www.worldofgothic.com/">World of Gothic</a>',
  'Markers from <a href="https://www.xboxachievements.com/forum/topic/239955-arcania-gothic-4-collectables-guide/">Xbox Achievements</a>',
  'Made with <a href="https://leafletjs.com">Leaflet</a>'
];

const iconSize: L.PointTuple = [25, 25];
let map: L.Map;

const adanosMarkers = ref<IMarkers[]>(markAdanos);
const beliarMarkers = ref<IMarkers[]>(markBeliar);
const innosMarkers = ref<IMarkers[]>(markInnos);

onMounted(async () => {
  map = mapUtils.initMap();
  mapUtils.setTileMap('gothic_4', attribuitions.join(' | '));

  const adanosIcon = mapUtils.createIcon('gothic_4', 'adanos.webp', iconSize, 'adanos-icon');
  adanosMarkers.value.forEach((marker, index) => createMarker(marker, adanosIcon, index));

  const beliarIcon = mapUtils.createIcon('gothic_4', 'beliar.webp', iconSize, 'beliar-icon');
  beliarMarkers.value.forEach((marker, index) => createMarker(marker, beliarIcon, index));

  const innosIcon = mapUtils.createIcon('gothic_4', 'innos.webp', iconSize, 'innos-icon');
  innosMarkers.value.forEach((marker, index) => createMarker(marker, innosIcon, index));
})

function createMarker(markerDetails: IMarkers, icon: L.Icon, index: number) {
  const { marker, popup } = mapUtils.createMarker(markerDetails.coord, icon, markerDetails.title);

  marker.on('click', () => {
    popup.setContent(`
      <div class="instructions">${markerDetails.instructions}</div>
      <hr class="divider" />
      <label role="button" class="collectedButton">
        <input 
          type="checkbox" id="collectedInput"
          ${markerDetails.collected ? 'checked' : ''} 
        />
        Collected
      </label>
    `)

    popup.openOn(map);

    const button = document.querySelector('#collectedInput');
    button!.addEventListener('input', () => {
      markerDetails.collected = !markerDetails.collected
    })
  })
}
</script>

<style>
#map.gothic_4_map {
  background-color: black;
}
</style>