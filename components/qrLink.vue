<template>
  <v-container pt-1>
    <v-row>
      <v-icon
        large
        class="mr-2"
      >
        mdi-link-variant
      </v-icon>
      <span class="display-1 font-weight-regular">Ссылка</span>
    </v-row>
    <v-divider class="mb-5" />

    <v-text-field
      v-model="LinkData"
      name="text"
      label="Ссылка на интернет-ресурс"
      value=""
      counter="100"
      prepend-inner-icon="link"
      hint="С указанием интернет-протокола. &quot;http://&quot;, &quot;https://&quot; и др. Например: &quot;https://qr-board.ru&quot; "
      clearable
      outlined
      class="mt-10"
      prefix="http://"
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
