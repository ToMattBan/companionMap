<template>
  <div id="map" class="gothic_4_map"></div>
</template>

<script lang="ts" setup>
import type { IMarkers } from '~/interfaces/map';
import mapUtils from '@/utils/map';

import markAdanos from '@/assets/markers/gothic_4/adanos'
import markBeliar from '@/assets/markers/gothic_4/beliar'
import markInnos from '@/assets/markers/gothic_4/innos'

import pouchdb from 'pouchdb';

const attribuitions: string[] = [
  'Maps from <a href="https://www.worldofgothic.com/">World of Gothic</a>',
  'Markers from <a href="https://www.xboxachievements.com/forum/topic/239955-arcania-gothic-4-collectables-guide/">Xbox Achievements</a>',
  'Made with <a href="https://leafletjs.com">Leaflet</a>'
];

const iconSize: L.PointTuple = [25, 25];
let map: L.Map;

const adanosMarkers = ref<IMarkers[]>(markAdanos);
let adanosDB: { id: string, rev: string };
const beliarMarkers = ref<IMarkers[]>(markBeliar);
let beliarDB: { id: string, rev: string };
const innosMarkers = ref<IMarkers[]>(markInnos);
let innosMDB: { id: string, rev: string };

const db = new pouchdb('gothic_4');

onMounted(async () => {
  await startDB();

  if (!map) map = mapUtils.initMap();
  mapUtils.setTileMap('gothic_4', attribuitions.join(' | '));

  const adanosIcon = mapUtils.createIcon('gothic_4', 'adanos.webp', iconSize, 'adanos-icon');
  adanosMarkers.value.forEach((marker, index) => createMarker(marker, adanosIcon, index));

  const beliarIcon = mapUtils.createIcon('gothic_4', 'beliar.webp', iconSize, 'beliar-icon');
  beliarMarkers.value.forEach((marker, index) => createMarker(marker, beliarIcon, index));

  const innosIcon = mapUtils.createIcon('gothic_4', 'innos.webp', iconSize, 'innos-icon');
  innosMarkers.value.forEach((marker, index) => createMarker(marker, innosIcon, index));
})

async function startDB() {
  const items = await db.allDocs({ descending: true, include_docs: true })


  if (items.total_rows === 0) {
    adanosDB = await db.put({ _id: "adanosMarkers", title: "adanosMarkers", markers: adanosMarkers.value })
    beliarDB = await db.put({ _id: "beliarMarkers", title: "beliarMarkers", markers: beliarMarkers.value })
    innosMDB = await db.put({ _id: "innosMarkers", title: "innosMarkers", markers: innosMarkers.value })
  } else {
    items.rows.forEach(row => {

      if (row.id === 'adanosMarkers') {
        adanosMarkers.value = row.doc!.markers;
        adanosDB = { id: row.doc!._id, rev: row.doc!._rev };
        return;
      }

      if (row.id === 'beliarMarkers') {
        beliarMarkers.value = row.doc!.markers;
        beliarDB = { id: row.doc!._id, rev: row.doc!._rev };
        return;
      }

      if (row.id === 'innosMarkers') {
        innosMarkers.value = row.doc!.markers;
        innosMDB = { id: row.doc!._id, rev: row.doc!._rev };
        return;
      }
    })
  }
}

async function updateDB() {
  db.put({ _id: adanosDB.id, _rev: adanosDB.rev, markers: adanosMarkers.value });
  db.put({ _id: beliarDB.id, _rev: beliarDB.rev, markers: beliarMarkers.value });
  db.put({ _id: innosMDB.id, _rev: innosMDB.rev, markers: innosMarkers.value });
}

function createMarker(markerDetails: IMarkers, icon: L.Icon) {
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
      updateDB()
    })
  })
}
</script>

<style>
#map.gothic_4_map {
  background-color: black;
}
</style>