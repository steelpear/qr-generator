<template>
  <v-container pt-1>
    <v-row>
      <v-icon
        large
        class="mr-2"
      >
        mdi-map-marker-radius-outline
      </v-icon>
      <span class="display-1 font-weight-regular">Географические координаты</span>
      <v-spacer />
      <v-btn icon @click="resetMap">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-row>
    <v-divider class="mb-5" />
    <v-form ref="form">
      <yandex-map
        :settings="mapSettings"
        :coords="coords"
        zoom="10"
        style="height: 220px;"
        :behaviors="['drag']"
        :controls="['default']"
        class="elevation-4"
        @click="clickOnMap"
      >
        <ymap-marker
          marker-id="123"
          :coords="coords"
          :icon="{color: 'blue', glyph: 'dot'}"
        />
      </yandex-map>
      <v-text-field
        v-model="handleCoords"
        :label="'Текущие координаты: ' + coords"
        clearable
        outlined
        prepend-inner-icon="location_on"
        class="mt-8"
        hint="Широта и долгота через запятую. Например 55.755814,37.617635"
      />
    </v-form>
  </v-container>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
export default {
  components: {
    yandexMap,
    ymapMarker
  },
  data: () => ({
    handleCoords: '',
    mapSettings: {
      apiKey: '8cde1dc1-2e0e-4719-9beb-e981408b7735',
      lang: 'ru_RU',
      coordorder: 'latlong',
      version: '2.1'
    }
  }),
  computed: {
    coords: {
      get () { return this.$store.getters.get_geo },
      set (value) { this.$store.dispatch('set_geo', value) }
    }
  },
  watch: {
    handleCoords (value) {
      const regex = /^-?(?:0|0\.\d*|[1-9]\d*\.?\d*)/
      let val = null
      if (value !== '' && value.match(regex)) {
        val = value.split(',')
        if (val.length > 1) { this.$store.dispatch('set_geo', val) }
      }
    }
  },
  methods: {
    clickOnMap (e) {
      this.$store.dispatch('set_geo', e.get('coords'))
    },
    resetMap () {
      this.$refs.form.reset()
      this.handleCoords = ''
      this.$store.dispatch('set_geo', [55.75115178233711, 37.61898136805887])
    }
  }
}
</script>
