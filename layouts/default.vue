<template>
  <v-app>
    <v-app-bar
      fixed
      app
      :color="$vuetify.breakpoint.xsOnly ? 'indigo' : 'white'"
      :dark="$vuetify.breakpoint.xsOnly"
      flat
      :max-width="$vuetify.breakpoint.xsOnly ? '100%' : '95%'"
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
      <v-spacer />
      <nuxt-link class="hidden-sm-and-up" style="text-decoration:none;" to="/">
        <v-icon large>
          fas fa-home
        </v-icon>
      </nuxt-link>
      <v-btn
        icon
        class="ml-4 hidden-xs-only"
        nuxt
        to="/"
      >
        <v-icon large>
          fas fa-home
        </v-icon>
      </v-btn>
      <v-btn
        icon
        class="ml-4"
        nuxt
        to="/decode"
      >
        <v-icon large>
          fas fa-qrcode
        </v-icon>
      </v-btn>
      <v-btn
        icon
        class="ml-1"
        nuxt
        to="/about"
      >
        <v-icon large>
          fas fa-info-circle
        </v-icon>
      </v-btn>
      <v-btn
        icon
        class="ml-1"
        nuxt
        to="/contacts"
      >
        <v-icon large>
          far fa-address-book
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-fade-transition>
          <nuxt />
        </v-fade-transition>
      </v-container>
    </v-main>
    <v-footer
      fixed
      app
      color="indigo"
      dark
      class="py-3"
    >
      <div class="overline" :class="$vuetify.breakpoint.smAndDown ? 'mx-auto' : 'copyright'">
        &copy; qr-generator {{ new Date().getFullYear() }}
      </div>
      <v-spacer v-if="$vuetify.breakpoint.smAndUp" />
      <Share :class="{'mx-auto':$vuetify.breakpoint.xsOnly}" />
      <v-spacer v-if="$vuetify.breakpoint.smAndUp" />
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
      </sharenetwork>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import Share from '~/components/Share.vue'
Vue.use(VueCookies)
export default {
  components: { Share },
  data () {
    return {
      title: 'Генератор QR-кодов',
      cookiePolicy: true
    }
  },
  mounted () {
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
  .logo { margin-top: 32px; }
  .copyright { position: absolute }
  a {text-decoration: none;}
</style>
