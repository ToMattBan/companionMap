// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [ '~/node_modules/leaflet/dist/leaflet.css', '@/global.css' ],
  ssr: false
})