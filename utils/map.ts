import * as L from 'leaflet';

type TGame = 'gothic_4';

const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'games_assets'
  : '_nuxt/public/games_assets/';

let map: L.Map;

function initMap() {
  map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 2,
    preferCanvas: true,
    zoomControl: false
  })

  new L.Control.Zoom({ position: 'topright' }).addTo(map)
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

  L.icon({
    iconUrl: `${baseUrl}/${game}/icons/${name}`,
    iconSize: size,
    className,
  })
}

export default {
  initMap,
  setTileMap,
  createIcon
};