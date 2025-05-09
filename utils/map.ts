import * as L from 'leaflet';

type TGame = 'gothic_4';

const isProd = process.env.NODE_ENV === 'production'
const baseUrl = isProd ? 'games_assets' : '_nuxt/public/games_assets';

let map: L.Map;

function initMap() {
  map = L.map('map', {
    center: [11.505, -0.09],
    zoom: 2,
    preferCanvas: true,
    zoomControl: false
  })

  new L.Control.Zoom({ position: 'topright' }).addTo(map)

  return map;
}

function setTileMap(game: TGame, attribuitions: string, modification?: string) {
  const tiles = modification ? `tiles_${modification}` : 'tiles'
  const tilesUrl = `${baseUrl}/${game}/map/${tiles}/{z}/{x}/{y}.jpg`

  const layer = L.tileLayer(tilesUrl, {
    minZoom: 1,
    maxZoom: 4,
    noWrap: true,
    attribution: attribuitions
  }).addTo(map)

  return layer;
}

function createLayerControl(layers: any) {
  L.control.layers(layers)
    .addTo(map)
    .setPosition('topright');
}

function createIcon(game: TGame, name: string, size: L.PointTuple, className?: string) {
  return L.icon({
    iconUrl: `${baseUrl}/${game}/icons/${name}`,
    iconSize: size,
    className,
  })
}

function createMarker(coord: L.PointTuple, icon: L.Icon, title: string, index: number) {
  index = index + 1;
  const marker = L.marker(coord, {
    icon,
    title: `${index} - ${title}`,
    alt: `${index} - ${title}`,

    riseOnHover: true,
    interactive: true
  })

  marker.addTo(map);

  const popup = L.popup().setLatLng(coord);

  return { marker, popup };
}

export default {
  initMap,
  setTileMap,
  createLayerControl,
  createIcon,
  createMarker
};