<template>
  <v-app>
    <v-app-bar
      fixed
      app
      :color="$vuetify.breakpoint.xsOnly ? 'indigo' : 'white'"
      :dark="$vuetify.breakpoint.xsOnly"
      flat
      max-width="95%"
      class="mx-auto mb-12"
    >
      <nuxt-link class="hidden-xs-only" to="/">
        <v-img
          src="/logoQR.png"
          alt="logo"
          class="logo"
          max-width="360"
        />
      </nuxt-link>
      <nuxt-link class="hidden-sm-and-up" style="text-decoration:none;" to="/">
        <v-icon large>
          home
        </v-icon>
      </nuxt-link>
      <v-spacer class="hidden-xs-only" />
      <v-toolbar-title class="title" :class="{'mx-auto':$vuetify.breakpoint.xsOnly}" v-text="title" />
      <v-btn
        icon
        class="ml-2"
        nuxt
        to="/about"
      >
        <v-icon large>
          help_outline
        </v-icon>
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

      <social-sharing
        title="QR-Generator"
        description="Бесплатный генератор QR-кода."
        quote="Бесплатный генератор QR-кода."
        hashtags="qr-code,free,generator"
        twitter-user="steelpear"
        inline-template
      >
        <div class="sharing">
          <network network="email" class="hidden-xs-only">
            <v-icon>mdi-email-outline</v-icon>
          </network>
          <network network="facebook">
            <v-icon>mdi-facebook</v-icon>
          </network>
          <network network="linkedin" class="hidden-xs-only">
            <v-icon>mdi-linkedin</v-icon>
          </network>
          <network network="odnoklassniki">
            <v-icon>mdi-odnoklassniki</v-icon>
          </network>
          <network network="pinterest" class="hidden-xs-only">
            <v-icon>mdi-pinterest</v-icon>
          </network>
          <network network="reddit" class="hidden-xs-only">
            <v-icon>mdi-reddit</v-icon>
          </network>
          <network network="skype" class="hidden-xs-only">
            <v-icon>mdi-skype</v-icon>
          </network>
          <network network="telegram">
            <v-icon>mdi-telegram</v-icon>
          </network>
          <network network="twitter">
            <v-icon>mdi-twitter</v-icon>
          </network>
          <network network="vk">
            <v-icon>mdi-vk</v-icon>
          </network>
          <network network="weibo" class="hidden-xs-only">
            <v-icon>mdi-sina-weibo</v-icon>
          </network>
          <network network="whatsapp">
            <v-icon>mdi-whatsapp</v-icon>
          </network>
        </div>
      </social-sharing>

      <v-spacer />
      <div class="overline">
        &copy; qr-generator {{ new Date().getFullYear() }}
      </div>
      <v-bottom-sheet
        v-model="cookiePolicy"
        hide-overlay
        persistent
      >
        <v-card class="py-2">
          <v-row align="center" justify="center">
            <v-row align="center" justify="center" class="px-8">
              <v-icon large class="ml-3 mr-2 hidden-sm-and-down">
                info
              </v-icon>
              <v-col :class="$vuetify.breakpoint.smAndDown ? 'text-justify' : 'text-center'" style="max-width: fit-content;">
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
const SocialSharing = require('vue-social-sharing')
Vue.use(SocialSharing)
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
  .logo { margin-top: 30px; }
  .sharing span {
    cursor: pointer;
    margin: 0 3px;
  }
  .sharing span:focus { outline: none; }
  .sharing .v-icon {color: lightgrey;}
  .sharing .v-icon:hover {color: white;}
</style>
