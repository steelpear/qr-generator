<template>
  <v-container :class="{'px-4':$vuetify.breakpoint.smAndDown}">
    <h1 class="text-center mt-8">
      Контакты и прочее
    </h1>

    <v-row align="center" class="mt-8">
      <v-icon
        large
        class="mr-2"
      >
        mdi-at
      </v-icon>
      <div class="headline">
        <a href="mailto:steelpear@gmail.com" target="_blank">steelpear@gmail.com</a>
      </div>
      <div class="title ml-2">
        - для связи с разработчиком.
      </div>
    </v-row>

    <v-row align="center" class="mt-8">
      <v-icon
        large
        class="mr-2"
      >
        mdi-link-variant
      </v-icon>
      <div class="headline">
        <a href="https://qr-board.ru" target="_blank">QR-Board</a>
      </div>
      <div class="title ml-2">
        - доска объявлений в формате QR-кода.
      </div>
    </v-row>

    <v-divider class="my-6" />

    <v-row align="start">
      <v-col cols="12" xs="12" md="6">
        <p class="about-text grey--text text--darken-4 font-weight-light">
          <span class="font-weight-medium">QR-Generator</span> совершенно бесплатен, но если у Вас появилось желание поддержать проект - Вы можете либо сделать небольшое добровольное пожертвование на развитие сайта (оплату хостинга, доменного имени и др.) либо поделиться информацией о нём со своими друзьями в социальных сетях.
        </p>
        <p class="about-text grey--text text--darken-4 font-weight-light mt-6 text-right">
          Либо и то и другое) Спасибо.
        </p>
      </v-col>
      <v-col cols="12" xs="12" md="6">
        <iframe
          src="https://yoomoney.ru/quickpay/shop-widget?writer=seller&targets=%D0%94%D0%BE%D0%B1%D1%80%D0%BE%D0%B2%D0%BE%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D0%BF%D0%BE%D0%B6%D0%B5%D1%80%D1%82%D0%B2%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5&targets-hint=&default-sum=100&button-text=12&payment-type-choice=on&mobile-payment-type-choice=on&hint=&successURL=&quickpay=shop&account=410011206433601"
          width="100%"
          height="270"
          frameborder="0"
          allowtransparency="true"
          scrolling="no"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    //
  }),
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
  a {text-decoration: none;}
</style>
