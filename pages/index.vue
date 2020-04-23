<template>
  <v-container>
    <v-row align="start" justify="center">
      <v-col cols="12" md="7" xs="12">
        <v-tabs
          v-model="qrTab"
          show-arrows
          next-icon="redo"
          prev-icon="undo"
          centered
          grow
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
            <qr-sms v-if="tab.component == 'SMS'" />
            <qr-text v-else-if="tab.component == 'Text'" />
            <qr-vcard v-else-if="tab.component == 'BuisnessCard'" />
            <qr-map v-else-if="tab.component == 'Map'" />
            <qr-wifi v-else-if="tab.component == 'WiFi'" />
            <qr-link v-else-if="tab.component == 'Link'" />
            <qr-whatsapp v-else-if="tab.component == 'WhatsApp'" />
            <qr-skype v-else-if="tab.component == 'Skype'" />
            <qr-telegram v-else-if="tab.component == 'Telegram'" />
            <qr-youtube v-else-if="tab.component == 'Youtube'" />
          </v-tab-item>
        </v-tabs>
      </v-col>
      <v-col
        ref="qrcolumn"
        v-resize="onResize"
        cols="12"
        md="5"
        xs="12"
        class="text-center"
      >
        <v-slider
          v-model="qrWidth"
          step="10"
          ticks="always"
          thumb-label="always"
          min="150"
          :max="maxQrWidth"
          append-icon="zoom_in"
          prepend-icon="zoom_out"
          class="hidden-xs-only"
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
          :tick-labels="correctionLabels"
          label="Коррекция"
          step="1"
          ticks="always"
          tick-size="4"
          :max="3"
          class="mt-4"
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
              <p class="text-center mb-0">
                Фон
              </p>
              <v-color-picker
                v-model="qrBackColor"
                class="mx-auto"
                flat
                hide-inputs
                canvas-height="120"
              />
            </v-col>
            <v-col cols="12" md="4" xs="12">
              <p class="text-center mb-0">
                Пиксели
              </p>
              <v-color-picker
                v-model="qrFrontColor"
                class="mx-auto"
                flat
                hide-inputs
                canvas-height="120"
              />
            </v-col>
            <v-col cols="12" md="3" xs="12" align-self="start" class="pt-9 pl-9">
              <v-btn
                color="indigo"
                dark
                large
                tile
                block
                class="mb-6"
                @click="paintMenu = false"
              >
                Ok
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
                label="Инвертировать"
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
          icon: 'mdi-message-processing',
          component: 'SMS'
        },
        {
          icon: 'mdi-text',
          component: 'Text'
        },
        {
          icon: 'mdi-card-account-details-outline',
          component: 'BuisnessCard'
        },
        {
          icon: 'mdi-map-marker-radius-outline',
          component: 'Map'
        },
        {
          icon: 'mdi-wifi',
          component: 'WiFi'
        },
        {
          icon: 'mdi-link-variant',
          component: 'Link'
        },
        {
          icon: 'mdi-whatsapp',
          component: 'WhatsApp'
        },
        {
          icon: 'mdi-skype-business',
          component: 'Skype'
        },
        {
          icon: 'mdi-telegram',
          component: 'Telegram'
        },
        {
          icon: 'mdi-youtube',
          component: 'Youtube'
        }
      ],
      paintMenu: false,
      inverse: false,
      maxQrWidth: '300'
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
      this.maxQrWidth = this.$refs.qrcolumn.getBoundingClientRect().width - 40
    }
  }
}
</script>

<style scoped>
  .v-tab {
    min-width: 65px;
  }
</style>
