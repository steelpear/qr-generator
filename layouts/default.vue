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
      <v-flex class="text-right overline">
        &copy; qr-generator {{ new Date().getFullYear() }}
      </v-flex>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Генератор QR-кода'
    }
  }
}
</script>

<style>
  .logo {
    margin-top: 30px;
  }
</style>
