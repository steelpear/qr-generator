<template>
  <div>
    <ShareNetwork
      v-for="network in networks"
      :key="network.network"
      :network="network.network"
      :url="sharing.url"
      :title="sharing.title"
      :description="sharing.description"
      :quote="sharing.quote"
      :hashtags="sharing.hashtags"
      :twitter-user="sharing.twitterUser"
      :class="network.class"
      class="mx-1 sharing"
    >
      <v-icon>{{ network.icon }}</v-icon>
    </ShareNetwork>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sharing: {
        url: 'https://qr-generator.ru/',
        title: 'QR-Generator',
        description: 'Бесплатный генератор QR-кодов онлайн.',
        quote: 'Онлайн генератор QR-кодов.',
        hashtags: 'qr-code,free,generator,qr,online',
        twitterUser: ''
      },
      networks: [
        { network: 'email', icon: 'far fah fa-lg fa-envelope', class: 'hidden-xs-only' },
        { network: 'facebook', icon: 'fab fa-facebook-f' },
        { network: 'linkedin', icon: 'fab fah fa-lg fa-linkedin', class: 'hidden-xs-only' },
        { network: 'odnoklassniki', icon: 'fab fah fa-lg fa-odnoklassniki' },
        { network: 'pinterest', icon: 'fab fah fa-lg fa-pinterest', class: 'hidden-xs-only' },
        { network: 'reddit', icon: 'fab fah fa-lg fa-reddit-alien', class: 'hidden-xs-only' },
        { network: 'skype', icon: 'fab fah fa-lg fa-skype', class: 'hidden-xs-only' },
        { network: 'telegram', icon: 'fab fah fa-lg fa-telegram-plane' },
        { network: 'twitter', icon: 'fab fah fa-lg fa-twitter' },
        { network: 'vk', icon: 'fab fah fa-lg fa-vk' },
        { network: 'weibo', icon: 'fab fah fa-lg fa-weibo', class: 'hidden-xs-only' },
        { network: 'whatsapp', icon: 'fab fah fa-lg fa-whatsapp' }
      ]
    }
  }
}
</script>

<style scoped>
  .sharing span:focus { outline: none; }
  .sharing .v-icon {color: lightgrey;}
  .sharing .v-icon:hover {color: white;}
  a {text-decoration: none;}
</style>
