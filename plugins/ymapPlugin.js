import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'

const settings = {
  apiKey: '8cde1dc1-2e0e-4719-9beb-e981408b7735',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
} // настройки плагина

Vue.use(YmapPlugin, settings)
