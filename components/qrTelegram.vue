<template>
  <v-container pt-1>
    <v-row align="center">
      <v-icon
        large
        class="mr-2"
      >
        fab fah fa-lg fa-telegram-plane
      </v-icon>
      <div class="text-h4 font-weight-regular">
        Telegram
      </div>
      <v-spacer />
      <v-btn icon @click="$refs.form.reset()">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-row>
    <v-divider class="mt-5" />
    <v-form ref="form">
      <v-text-field
        v-model="telegram"
        label="Аккаунт Telegram"
        placeholder=" "
        clearable
        outlined
        :rules="[rules.required]"
        prepend-inner-icon="person"
        hint="Аккаунт или канал Telegram (без символа @)."
        class="mt-8"
      />
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    rules: {
      required: value => !!value || 'Необходимое поле'
    }
  }),
  computed: {
    telegram: {
      get () { return this.$store.getters.get_telegram_data },
      set (value) { this.$store.dispatch('set_telegram_data', value) }
    }
  }
}
</script>
