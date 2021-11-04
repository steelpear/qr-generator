<template>
  <v-container :class="{'px-4':$vuetify.breakpoint.smAndDown}">
    <h1 class="text-center">
      Что такое QR-код?
    </h1>
    <img
      src="pic.png"
      width="250"
      height="250"
      class="elevation-4 ml-4 mt-3 hidden-sm-and-down"
      style="float:right"
    >
    <p class="about-text grey--text text--darken-3 font-weight-light mt-2">
      <span class="red--text font-weight-medium">QR-код</span> (Quick Response Code) был придуман в 1994 году в Японии для нужд автомобильной промышленности с целью маркировки и учёта деталей. Штрих-код, который использовался до этого, перестал справляться с возросшим объёмом информации.
    </p>
    <p class="about-text grey--text text--darken-3 font-weight-light mt-2">
      С улучшением качества камер смартфонов QR-код получал всё более широкое распространение и в итоге шагнул далеко за пределы автоконцернов. QR-код способен в графическом виде компактно зашифровать довольно значительный объём информации – текст, ссылку, визитку, географическое положение, параметры подключения к Wi-Fi сети и многое другое.
    </p>
    <p class="about-text grey--text text--darken-3 font-weight-light mt-2">
      Расшифровать информацию, содержащуюся в QR-коде, можно при помощи специального приложения, установленного на смартфоне – сканера QR-code. Создать свой QR-код Вы можете на этом сайте, а также с помощью разнообразных online-сервисов и программ.
    </p>
    <h1 class="text-center">
      Некоторые сканеры QR-кода
    </h1>
    <div class="text-center my-6">
      <v-chip
        class="px-8 text-h5"
        color="primary"
        x-large
        dark
      >
        <v-avatar left>
          <v-icon>
            mdi-check-bold
          </v-icon>
        </v-avatar>
        Для Android
      </v-chip>
    </div>
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="2">
        <v-img src="1.webp" width="100" class="mx-auto" />
      </v-col>
      <v-col cols="12" md="8" class="text-center py-2">
        <a class="title blue--text text--darken-3" href="https://play.google.com/store/apps/details?id=com.teacapps.barcodescanner" target="_blank">Сканер QR и штрих-кодов</a>
        <p class="caption">
          TeaCapps
        </p>
      </v-col>
      <v-col cols="12" md="2">
        <v-img src="1.png" width="130" class="mx-auto" />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="2">
        <v-img src="2.webp" width="100" class="mx-auto" />
      </v-col>
      <v-col cols="12" md="8" class="text-center py-2">
        <a class="title blue--text text--darken-3" href="https://play.google.com/store/apps/details?id=com.google.zxing.client.android" target="_blank">Barcode Scanner</a>
        <p class="caption">
          ZXing Team
        </p>
      </v-col>
      <v-col cols="12" md="2">
        <v-img src="2.png" width="130" class="mx-auto" />
      </v-col>
    </v-row>
    <v-row align="center" class="mt-3">
      <v-icon large color="grey darken-2" class="mr-2">
        phone_android
      </v-icon>
      <v-col class="about-text grey--text text--darken-3 font-weight-light mt-1 mb-0">
        Некоторые производители смартфонов на Android предустанавливают на свои модели приложения для считывания QR и штрих-кодов. Изучите инструкцию пользователя - возможно Ваш смартфон уже обладает необходимым функционалом.
      </v-col>
    </v-row>
    <div class="text-center my-6">
      <v-chip
        class="px-8 text-h5"
        color="orange"
        x-large
        dark
      >
        <v-avatar left>
          <v-icon>
            mdi-check-bold
          </v-icon>
        </v-avatar>
        Для iPhone
      </v-chip>
    </div>
    <v-row align="center">
      <v-col cols="12" md="2">
        <v-img src="3.png" width="100" class="mx-auto" />
      </v-col>
      <v-col cols="12" md="8" class="text-center py-2">
        <a class="title blue--text text--darken-3" href="https://apps.apple.com/ru/app/qr-%D1%81%D0%BA%D0%B0%D0%BD%D0%B5%D1%80-%D1%88%D1%82%D1%80%D0%B8%D1%85-%D0%BA%D0%BE%D0%B4%D0%B0-qr-%D0%BA%D0%BE%D0%B4/id1262922153" target="_blank">QR сканер штрих-кода, QR-код</a>
        <p class="caption">
          TALENT ACQUISITIONS PTY LTD
        </p>
      </v-col>
      <v-col cols="12" md="2">
        <v-img src="33.png" width="130" class="mx-auto" />
      </v-col>
    </v-row>
    <v-row align="center" class="mt-3">
      <v-icon large color="grey darken-2" class="mr-2">
        phone_iphone
      </v-icon>
      <v-col class="about-text grey--text text--darken-3 font-weight-light mt-1 mb-0">
        Начиная с iOS 11 в камере iPhone и iPad появилась функция QR-ридера, предназначенная для считывания QR и штрих-кодов.
      </v-col>
    </v-row>
    <p class="text-center">
      <a class="title blue--text text--darken-3" href="https://support.apple.com/ru-ru/HT208843" target="_blank">Инструкция по сканированию</a>
    </p>
    <v-divider />
    <p class="title mt-4 text-center">
      <nuxt-link to="/policy" class="indigo--text">
        Использование файлов cookie и политика конфиденциальности
      </nuxt-link>
    </p>
    <p class="title mt-4 text-center">
      <nuxt-link to="/contacts" class="indigo--text">
        Контакты и прочее
      </nuxt-link>
    </p>
  </v-container>
</template>

<script>
export default {
  head () {
    return {
      title: 'Информация'
    }
  },
  mounted () {
    this.$vuetify.goTo(0)
  }
}
</script>

<style scoped>
  .about-text {
    font-size: 18px;
    text-align: justify;
  }
</style>
