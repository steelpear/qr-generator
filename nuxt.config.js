export default {
  // mode: 'spa',
  target: 'static',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'Генератор QR-кодов онлайн',
    title: 'Генератор QR-кодов онлайн',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Бесплатный генератор QR-кодов онлайн. Создание QR-кодов различных форматов - визитка, геолокация, ссылка, YouTube, WhatsApp, Telegram и других. Полученный QR-код можно раскрасить, изменить его размер и сохранить на компьютер.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'blue' },
  /*
  ** Global CSS
  */
  // css: [
  // ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/ymapPlugin.js', ssr: false },
    { src: '~/plugins/qrCodeReader.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */

  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-babel',
    'vue-social-sharing/nuxt'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  // axios: {
  // },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    transpile: [
      'vuetify/lib'
    ],
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
