<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
      color="white"
      flat
    >
      <nuxt-link to="/">
        <v-img
          src="/logoQR.png"
          alt="logo"
          class="logo"
          max-width="360"
        />
      </nuxt-link>
      <v-spacer />
      <v-toolbar-title class="title text--secondary" v-text="title" />
      <v-btn
        icon
        class="ml-2"
        nuxt
        to="/about"
      >
        <v-icon>help_outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-fade-transition>
          <nuxt />
        </v-fade-transition>
      </v-container>
    </v-content>
    <v-footer
      fixed
      app
      color="indigo"
      dark
    >
      <v-spacer />
      <div class="overline">
        &copy; qr-generator {{ new Date().getFullYear() }}
      </div>
      <v-bottom-sheet
        v-model="cookiePolicy"
        full-width
        hide-overlay
        persistent
      >
        <v-card class="py-2">
          <v-row align="center" justify="center">
            <v-row align="center" justify="center">
              <v-icon large class="ml-3 mr-2 hidden-sm-and-down">
                info
              </v-icon>
              <v-col :class="$vuetify.breakpoint.smAndDown ? 'text-xs-justify ml-4' : 'text-xs-center'" style="max-width: fit-content;">
                На этом сайте используются файлы <span class="font-weight-bold">cookie</span>. Продолжая просматривать его, Вы соглашаетесь с этим. Чтобы узнать больше <nuxt-link to="/policy" class="indigo--text font-weight-bold">
                  нажмите здесь
                </nuxt-link>.
              </v-col>
            </v-row>
            <v-btn depressed color="primary" class="mr-6" @click="cookieOk">
              OK, понятно
            </v-btn>
          </v-row>
        </v-card>
      </v-bottom-sheet>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
export default {
  data () {
    return {
      title: 'Генератор QR-кода',
      cookiePolicy: true
    }
  },
  created () {
    if (this.$cookies.get('cookie_assent')) {
      this.cookiePolicy = false
    }
  },
  methods: {
    cookieOk () {
      this.cookiePolicy = false
      this.$cookies.set('cookie_assent', 'cookie_session', '30d')
    }
  }
}
</script>

<style>
  .logo {
    margin-top: 30px;
  }
</style>
