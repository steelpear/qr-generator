<template>
  <v-container :class="{'pb-6' : $vuetify.breakpoint.xsOnly}">
    <v-row align="start" justify="center">
      <v-col cols="12" md="7" xs="12">
        <v-tabs
          v-model="qrTab"
          show-arrows
          next-icon="redo"
          prev-icon="undo"
          center-active
          dark
          background-color="indigo"
          fixed-tabs
          icons-and-text
          slider-size="6"
        >
          <v-tabs-slider />

          <v-tab
            v-for="(tab, index) in tabs"
            :key="index"
            :href="`#tab-${index}`"
          >
            <v-icon large color="active">
              {{ tab.icon }}
            </v-icon>
          </v-tab>

          <v-tab-item
            v-for="(tab, index) in tabs"
            :key="index"
            :value="'tab-' + index"
            class="mt-8"
          >
            <qr-sms v-if="tab.component === 'SMS'" />
            <qr-text v-else-if="tab.component === 'Text'" />
            <qr-vcard v-else-if="tab.component === 'BuisnessCard'" />
            <qr-map v-else-if="tab.component === 'Map'" />
            <qr-wifi v-else-if="tab.component === 'WiFi'" />
            <qr-link v-else-if="tab.component === 'Link'" />
            <qr-whatsapp v-else-if="tab.component === 'WhatsApp'" />
            <qr-skype v-else-if="tab.component === 'Skype'" />
            <qr-telegram v-else-if="tab.component === 'Telegram'" />
            <qr-youtube v-else />
          </v-tab-item>
        </v-tabs>
      </v-col>
      <v-col
        ref="qrcolumn"
        v-resize="onResize"
        cols="12"
        md="5"
        xs="12"
        class="text-center mt-2"
      >
        <v-slider
          v-model="qrWidth"
          dense
          hide-details
          step="10"
          ticks="always"
          thumb-label="always"
          :thumb-size="30"
          min="150"
          :max="maxQrWidth"
          append-icon="zoom_in"
          prepend-icon="zoom_out"
          class="hidden-xs-only mb-2"
          @click:append="zoomIn"
          @click:prepend="zoomOut"
        />
        <qrcode
          ref="canvas"
          :value="qrValue ? qrValue : 'QR-Generator'"
          :options="{
            color: {
              dark: qrFrontColor,
              light: qrBackColor
            },
            width: qrWidth,
            errorCorrectionLevel: errorCorrectionLevel
          }"
          class="elevation-4 d-inline-flex"
        />
        <v-slider
          v-model="correction"
          dense
          hide-details
          :tick-labels="correctionLabels"
          label="Коррекция"
          step="1"
          ticks="always"
          tick-size="4"
          :max="3"
          class="mb-3 mt-1"
          @input="correctionInput"
        />
        <v-row align="center" justify="center" class="mt-2" dense>
          <v-col cols="12" md="6" xs="auto" sm="6">
            <v-btn
              color="indigo"
              dark
              tile
              large
              block
              @click="paintMenu = !paintMenu"
            >
              <v-icon left>
                mdi-format-color-fill
              </v-icon>
              Раскрасить
            </v-btn>
          </v-col>
          <v-col cols="12" md="6" xs="auto" sm="6">
            <v-btn
              color="indigo"
              dark
              tile
              large
              block
              @click="saveImg"
            >
              <v-icon left>
                mdi-content-save
              </v-icon>
              Сохранить
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-bottom-sheet
      v-model="paintMenu"
      hide-overlay
      scrollable
      inset
    >
      <v-card>
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col cols="12" md="4" xs="12">
              <p class="text-center mb-0 text-subtitle-1 text--primary">
                Фон
              </p>
              <v-color-picker
                v-model="qrBackColor"
                class="mx-auto"
                flat
                hide-canvas
                hide-inputs
                hide-mode-switch
                hide-sliders
                show-swatches
                swatches-max-height="150"
                :swatches="customPalette"
              />
            </v-col>
            <v-col cols="12" md="4" xs="12">
              <p class="text-center mb-0 text-subtitle-1 text--primary">
                Пиксели
              </p>
              <v-color-picker
                v-model="qrFrontColor"
                class="mx-auto"
                flat
                hide-canvas
                hide-inputs
                hide-mode-switch
                hide-sliders
                show-swatches
                swatches-max-height="150"
                :swatches="customPalette"
              />
            </v-col>
            <v-col cols="12" md="3" xs="12" align-self="start" class="pt-9 pl-9">
              <v-btn
                color="orange"
                dark
                large
                tile
                block
                class="mb-4"
                @click="paintMenu = false"
              >
                Применить
              </v-btn>
              <v-btn
                color="indigo"
                dark
                large
                tile
                block
                @click="resetColors"
              >
                Сбросить
              </v-btn>
              <v-switch
                v-model="inverse"
                label="Поменять цвета"
                @change="inverseColors"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'
import qrSms from '~/components/qrSms.vue'
import qrText from '~/components/qrText.vue'
import qrVcard from '~/components/qrVcard.vue'
import qrMap from '~/components/qrMap.vue'
import qrWifi from '~/components/qrWifi.vue'
import qrLink from '~/components/qrLink.vue'
import qrWhatsapp from '~/components/qrWhatsapp.vue'
import qrSkype from '~/components/qrSkype.vue'
import qrTelegram from '~/components/qrTelegram.vue'
import qrYoutube from '~/components/qrYoutube.vue'

export default {
  components: {
    qrSms,
    qrText,
    qrVcard,
    qrMap,
    qrWifi,
    qrLink,
    qrWhatsapp,
    qrSkype,
    qrTelegram,
    qrYoutube,
    qrcode: VueQrcode
  },
  data () {
    return {
      qrWidth: 300,
      errorCorrectionLevel: 'M',
      qrFrontColor: '#000000ff',
      qrBackColor: '#ffffffff',
      correction: 1,
      correctionLabels: [
        'L',
        'M',
        'Q',
        'H'
      ],
      qrTab: null,
      tabs: [
        {
          icon: 'far fa-comment-dots',
          component: 'SMS'
        },
        {
          icon: 'fas fa-align-left',
          component: 'Text'
        },
        {
          icon: 'far fa-address-card',
          component: 'BuisnessCard'
        },
        {
          icon: 'fas fa-map-marker-alt',
          component: 'Map'
        },
        {
          icon: 'fas fa-wifi',
          component: 'WiFi'
        },
        {
          icon: 'fas fa-link',
          component: 'Link'
        },
        {
          icon: 'fab fa-whatsapp',
          component: 'WhatsApp'
        },
        {
          icon: 'fab fa-skype',
          component: 'Skype'
        },
        {
          icon: 'fab fah fa-lg fa-telegram-plane',
          component: 'Telegram'
        },
        {
          icon: 'fab fa-youtube',
          component: 'Youtube'
        }
      ],
      paintMenu: false,
      inverse: false,
      maxQrWidth: '300',
      customPalette: [
        ['#FFFFFF', '#FFFF00', '#FF9900', '#CC6600', '#993300'],
        ['#FF9966', '#FF6600', '#FF0000', '#CC0000', '#990000'],
        ['#99FF66', '#33FF00', '#00CC00', '#009900', '#336600'],
        ['#99CCFF', '#3399FF', '#3366FF', '#0033FF', '#0033CC'],
        ['#CCCCCC', '#999999', '#666666', '#333333', '#000000']
      ]
    }
  },
  head () {
    return {
      title: 'Главная'
    }
  },
  computed: {
    qrValue () {
      if (this.qrTab === 'tab-0') {
        return this.$store.getters.get_sms
      } else if (this.qrTab === 'tab-1') {
        return this.$store.getters.get_text
      } else if (this.qrTab === 'tab-2') {
        return this.$store.getters.get_vcard
      } else if (this.qrTab === 'tab-3') {
        return this.$store.getters.get_geo_data
      } else if (this.qrTab === 'tab-4') {
        return this.$store.getters.get_wifi
      } else if (this.qrTab === 'tab-5') {
        return this.$store.getters.get_link
      } else if (this.qrTab === 'tab-6') {
        return this.$store.getters.get_whatsapp
      } else if (this.qrTab === 'tab-7') {
        return this.$store.getters.get_skype
      } else if (this.qrTab === 'tab-8') {
        return this.$store.getters.get_telegram
      } else if (this.qrTab === 'tab-9') {
        return this.$store.getters.get_youtube
      } else {
        return false
      }
    }
  },
  mounted () {
    this.onResize()
    this.$vuetify.goTo(0)
  },
  methods: {
    zoomOut () {
      this.qrWidth = (this.qrWidth - 10) || 0
    },
    zoomIn () {
      this.qrWidth = (this.qrWidth + 10) || 100
    },
    correctionInput (val) {
      switch (val) {
        case 0:
          this.errorCorrectionLevel = 'L'
          break
        case 1:
          this.errorCorrectionLevel = 'M'
          break
        case 2:
          this.errorCorrectionLevel = 'Q'
          break
        default:
          this.errorCorrectionLevel = 'H'
      }
    },
    resetColors () {
      this.qrFrontColor = '#000000ff'
      this.qrBackColor = '#ffffffff'
      this.inverse = false
    },
    inverseColors () {
      const front = this.qrFrontColor
      const back = this.qrBackColor
      this.qrFrontColor = back
      this.qrBackColor = front
    },
    saveImg () {
      const canvas = this.$refs.canvas.$el
      const dataURL = canvas.toDataURL('image/jpeg', 1)
      const link = document.createElement('a')
      link.href = dataURL
      link.download = 'qr-generator.jpg'
      link.click()
    },
    onResize () {
      const width = this.$refs.qrcolumn.getBoundingClientRect().width - 40
      if (width <= 440) {
        this.maxQrWidth = width
      } else { this.maxQrWidth = 440 }
    }
  }
}
</script>

<style scoped>
  .v-tab {
    min-width: 68px;
  }
</style>
