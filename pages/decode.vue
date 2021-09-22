<template>
  <v-container :class="{'px-4':$vuetify.breakpoint.smAndDown}">
    <h1 class="text-center mb-6">
      Расшифровать QR-код
    </h1>
    <v-card>
      <v-tabs
        v-model="tab"
        background-color="transparent"
        centered
      >
        <v-tabs-slider />
        <v-spacer />
        <v-tab href="#tab-1">
          Перетащить<span class="hidden-sm-and-down">&nbsp;картинку</span>
        </v-tab>
        <v-tab href="#tab-2">
          Загрузить<span class="hidden-sm-and-down">&nbsp;файл</span>
        </v-tab>
        <v-tab href="#tab-3">
          Сканировать<span class="hidden-sm-and-down">&nbsp;камерой</span>
        </v-tab>
        <v-spacer />
        <v-btn icon class="ma-1" @click="resetResult">
          <v-icon>clear</v-icon>
        </v-btn>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item
          value="tab-1"
        >
          <v-card flat class="py-8" :class="{'px-16': $vuetify.breakpoint.mdAndUp}">
            <v-fade-transition>
              <div v-if="result" class="decode-result about-text pa-4 mb-6 grey lighten-2">
                <v-chip
                  class="ma-2"
                  color="indigo"
                  label
                  text-color="white"
                >
                  Результат:
                </v-chip>
                {{ result }}
              </div>
            </v-fade-transition>
            <p v-if="error !== null" class="drop-error">
              {{ error }}
            </p>
            <div>
              <qrcode-drop-zone @detect="onDetect" @dragover="onDragOver" @init="logErrors">
                <div class="drop-area mx-auto" :class="{ 'dragover': dragover }">
                  <div style="line-height: 1em;">
                    Перетащите сюда
                  </div>
                </div>
              </qrcode-drop-zone>
            </div>
          </v-card>
        </v-tab-item>
        <v-tab-item
          value="tab-2"
        >
          <v-card flat class="py-8 text-center" :class="{'px-16': $vuetify.breakpoint.mdAndUp}">
            <v-fade-transition>
              <div v-if="result" class="decode-result about-text pa-4 mb-6 grey lighten-2">
                <v-chip
                  class="ma-2"
                  color="indigo"
                  label
                  text-color="white"
                >
                  Результат:
                </v-chip>
                {{ result }}
              </div>
            </v-fade-transition>
            <qrcode-capture @decode="onDecode" />
          </v-card>
        </v-tab-item>
        <v-tab-item
          value="tab-3"
        >
          <v-card flat class="py-8" :class="{'px-16': $vuetify.breakpoint.mdAndUp}">
            <div class="about-text grey--text text--darken-3 font-weight-light px-2">
              Если Ваше устройство оборудовано камерой - Вы можете отсканировать QR-код с её помощью. Если нет - воспользуйтесь другими способами.
            </div>
            <div>
              <p class="error">
                {{ error }}
              </p>
              <v-fade-transition>
                <div v-if="result" class="decode-result about-text pa-4 mb-6 grey lighten-2">
                  <v-chip
                    class="ma-2"
                    color="indigo"
                    label
                    text-color="white"
                  >
                    Результат:
                  </v-chip>
                  {{ result }}
                </div>
              </v-fade-transition>
              <v-col
                class="mx-auto text-center"
                cols="12"
                md="6"
                sm="12"
                xs="12"
                lg="6"
              >
                <v-progress-circular
                  v-show="loading"
                  :size="100"
                  :width="10"
                  color="indigo"
                  indeterminate
                />
                <qrcode-stream v-show="!loading" :camera="camera" @decode="onDecode" @init="onInit" />
              </v-col>
            </div>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tab: null,
    result: '',
    error: null,
    dragover: false,
    loading: true
  }),
  computed: {
    camera () {
      if (this.tab === 'tab-3') {
        return 'auto'
      } else { return 'off' }
    }
  },
  mounted () {
    this.$vuetify.goTo(0)
  },
  methods: {
    resetResult () {
      this.result = ''
      this.error = null
    },
    onDecode (result) {
      this.result = result
    },
    async onDetect (promise) {
      try {
        const { content } = await promise
        this.result = content
        this.error = null
      } catch (error) {
        if (error.name === 'DropImageFetchError') {
          this.error = 'К сожалению, вы не можете загрузить изображения из разных источников.'
        } else if (error.name === 'DropImageDecodeError') {
          this.error = 'Это не изображение - не может быть декодировано.'
        } else {
          this.error = 'Ошибка декодирования: ' + error.message
        }
      }
    },
    logErrors (promise) {
      // eslint-disable-next-line no-console
      promise.catch(console.error)
    },
    onDragOver (isDraggingOver) {
      this.dragover = isDraggingOver
    },
    async onInit (promise) {
      setTimeout(() => {
        this.loading = false
      }, 1000)
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permission'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser'
        } else if (error.name === 'InsecureContextError') {
          this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
        } else {
          this.error = `ERROR: Ошибка камеры (${error.name})`
        }
      }
    }
  }
}
</script>

<style scoped>
  .about-text {
    font-size: 18px;
  }
  .drop-area {
  height: 300px;
  width: 300px;
  text-align: center;
  font-weight: bold;
  background: url('/arrows.png') no-repeat;
  background-size: 300px;
  opacity: .8;
}
.dragover {
  color: black;
  opacity: 1;
}
.drop-error {
  color: red;
  font-weight: bold;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
