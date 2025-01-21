import * as L from 'leaflet';

type TGame = 'gothic_4';

const isProd = process.env.NODE_ENV === 'production'
const baseUrl = isProd ? 'games_assets' : '_nuxt/public/games_assets';

let map: L.Map;

function initMap() {
  map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 2,
    preferCanvas: true,
    zoomControl: false
  })

  new L.Control.Zoom({ position: 'topright' }).addTo(map)

  return map;
}

function setTileMap(game: TGame, attribuitions: string) {
  const tilesUrl = `${baseUrl}/${game}/map/tiles/{z}/{x}/{y}.jpg`

  L.tileLayer(tilesUrl, {
    minZoom: 1,
    maxZoom: 4,
    noWrap: true,
    attribution: attribuitions
  }).addTo(map);
}

function createIcon(game: TGame, name: string, size: L.PointTuple, className?: string) {
  return L.icon({
    iconUrl: `${baseUrl}/${game}/icons/${name}`,
    iconSize: size,
    className,
  })
}

function createMarker(coord: L.PointTuple, icon: L.Icon, title: string) {
  const marker = L.marker(coord, {
    icon,
    title,
    alt: title,

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
  createIcon,
  createMarker
};