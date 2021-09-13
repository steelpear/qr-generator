<template>
  <v-container pt-1>
    <v-row align="center">
      <v-icon
        large
        class="mr-2"
      >
        mdi-text
      </v-icon>
      <div class="text-h4 font-weight-regular">
        Текст
      </div>
    </v-row>
    <v-divider class="mt-5" />

    <v-textarea
      v-model="TextData"
      label="Введите текст"
      rows="4"
      counter="120"
      auto-grow
      clearable
      outlined
      hint="Помните - слишком длинный текст может отрицательно сказаться на правильном распознавании кода!"
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
    TextData: {
      get () {
        return this.$store.getters.get_text
      },
      set (value) {
        this.$store.dispatch('set_text', value)
      }
    }
  }
}
</script>
