<template>
  <div id="map" class="gothic_4_map"></div>
  <div @click="toggleOpenExtras" :class="[{ 'open': openExtras }, 'destroy_db']">
    <button @click="clearDB">Clear all markers</button>
    <span>{{ openExtras ? '<' : '>' }}</span>
  </div>
</template>

<script lang="ts" setup>
import type { IMarkers, MarkersMapping } from '~/interfaces/map';
import pouchdb from 'pouchdb';
import mapUtils from '@/utils/map';

import markAdanos from '@/assets/markers/gothic_4/adanos'
import markBeliar from '@/assets/markers/gothic_4/beliar'
import markInnos from '@/assets/markers/gothic_4/innos'

const openExtras = ref<boolean>(false);

const attribuitions: string[] = [
  'Video guide from <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=Ei4UsJA4XMs&list=PLUrCwuoxYlm29kzLNNsUUxKy5f5l2_aRD/">LT_Sp0rk</a>',
  'Markers from <a target="_blank" rel="noopener noreferrer" href="https://www.xboxachievements.com/forum/topic/239955-arcania-gothic-4-collectables-guide/">Xbox Achievements</a>',
  'Maps from <a target="_blank" rel="noopener noreferrer" href="https://www.worldofgothic.com/">World of Gothic</a>',
  'Made with <a target="_blank" rel="noopener noreferrer" href="https://leafletjs.com">Leaflet</a>'
];

const markersMapping: MarkersMapping = {
  adanosMarkers: {
    name: 'adanos',
    markers: markAdanos,
    dbase: { id: '', rev: '' },
  },
  beliarMarkers: {
    name: 'beliar',
    markers: markBeliar,
    dbase: { id: '', rev: '' },
  },
  innosMarkers: {
    name: 'innos',
    markers: markInnos,
    dbase: { id: '', rev: '' },
  }
};

const iconSize: L.PointTuple = [25, 25];
const collectedOpacity: number = 0.5;
let map: L.Map;

const db = new pouchdb('gothic_4');

onMounted(async () => {
  await startDB();

  createMap();
})

async function startDB() {
  const items = await db.allDocs({ descending: true, include_docs: true })

  if (items.total_rows === 0) {
    Object.keys(markersMapping).forEach(async (key) => {
      const collectedMarkers = markersMapping[key].markers.map(marker => marker.collected)

      markersMapping[key].dbase = await db.put({ _id: key, title: key, markers: collectedMarkers })
    })
  } else {
    items.rows.forEach(row => {
      const mapping = markersMapping[row.id];
      if (!mapping) return;

      mapping.markers.forEach((marker, index) => {
        // @ts-ignore: Markers does exist, but not on the type
        marker.collected = row.doc!.markers[index];
      });

      mapping.dbase = { id: row.doc!._id, rev: row.doc!._rev };
    });
  }
}

async function updateDB() {
  Object.values(markersMapping).forEach(async (mapping) => {
    const { dbase, markers } = mapping;
    const collectedMarkers = markers.map(marker => marker.collected);

    mapping.dbase = await db.put({ _id: dbase.id, _rev: dbase.rev, markers: collectedMarkers });
  });

}

function createMap() {
  if (!map) map = mapUtils.initMap();
  const layerNormal = mapUtils.setTileMap('gothic_4', attribuitions.join(' | '));
  const layerUnderground = mapUtils.setTileMap('gothic_4', attribuitions.join(' | '), 'under');

  layerNormal.addTo(map);

  const layers = {
    "Normal Map": layerNormal,
    "Underground Map": layerUnderground,
  }

  mapUtils.createLayerControl(layers);

  Object.values(markersMapping).forEach(({ name, markers }) => {
    const icon = mapUtils.createIcon('gothic_4', `${name}.webp`, iconSize);

    markers.forEach((marker, index) => createMarker(marker, icon, index));
  })
}

function createMarker(markerDetails: IMarkers, icon: L.Icon, index: number) {
  const { marker, popup } = mapUtils.createMarker(markerDetails.coord, icon, markerDetails.title, index);

  marker.setOpacity(markerDetails.collected ? collectedOpacity : 1);
  marker.on('click', () => {
    handleMarkerClick(markerDetails, popup, marker)
  })
}

function handleMarkerClick(markerDetails: IMarkers, popup: L.Popup, marker: L.Marker) {
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

  const allCheckes = document.querySelectorAll('#collectedInput');
  const button = allCheckes[allCheckes.length - 1];

  button!.addEventListener('input', () => {
    markerDetails.collected = !markerDetails.collected;

    marker.setOpacity(markerDetails.collected ? collectedOpacity : 1);

    updateDB();
  })
}

function toggleOpenExtras() {
  openExtras.value = !openExtras.value;
}

async function clearDB() {
  map.eachLayer((layer) => {
    (layer as L.Marker).setOpacity(1)
  })

  for (const { dbase, markers } of Object.values(markersMapping)) {
    markers.forEach(marker => marker.collected = false);

    await db.remove({ _id: dbase.id, _rev: dbase.rev });
  }

  startDB();
}
</script>

<style scoped lang="scss">
#map.gothic_4_map {
  background-color: black;
  position: relative;

  &~.destroy_db {
    z-index: 400;
    position: absolute;
    bottom: 10px;
    background-color: white;
    border-radius: 2px;
    display: flex;
    transform: translateX(calc(-100% + 30px));
    transition: all 0.4s ease;

    &.open {
      transform: none;
    }

    span {
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 22px;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>