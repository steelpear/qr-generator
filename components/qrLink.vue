<template>
  <v-container pt-1>
    <v-row align="center">
      <v-icon
        large
        class="mr-2"
      >
        mdi-link-variant
      </v-icon>
      <div class="text-h4 font-weight-regular">
        Ссылка
      </div>
    </v-row>
    <v-divider class="mt-5" />

    <v-text-field
      v-model="LinkData"
      name="text"
      label="Ссылка на интернет-ресурс"
      value=""
      counter="100"
      prepend-inner-icon="mdi-link-variant"
      hint="С указанием интернет-протокола. &quot;http://&quot;, &quot;https://&quot; и др. Например: &quot;https://qr-board.ru&quot; "
      clearable
      outlined
      class="mt-8"
    />
  </v-container>
</template>

<script>
export default {
  data: () => ({
    //
  }),
  computed: {
    LinkData: {
      get () { return this.$store.getters.get_link },
      set (value) { this.$store.dispatch('set_link', value) }
    }
  }
}
</script>
