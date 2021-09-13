<template>
  <v-container pt-1>
    <v-row align="center">
      <v-icon
        large
        class="mr-2"
      >
        mdi-whatsapp
      </v-icon>
      <div class="text-h4 font-weight-regular">
        WhatsApp
      </div>
      <v-spacer />
      <v-btn icon @click="$refs.form.reset()">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-row>
    <v-divider class="mt-5" />
    <div class="mt-8">
      <v-form ref="form">
        <v-text-field
          v-model="WhatsAppPhone"
          label="Номер телефона"
          clearable
          outlined
          prefix="+"
          mask="###############"
          prepend-inner-icon="phone"
          hint="В международном формате"
          :rules="[rules.required]"
          class="mb-5"
        />
        <v-textarea
          v-model="WhatsAppMessage"
          name="text"
          label="Сообщение"
          value=""
          rows="3"
          counter="120"
          clearable
          outlined
          auto-grow
          prepend-inner-icon="chat"
          placeholder=" "
          hint="Избегайте слишком длинных сообщений."
        />
      </v-form>
    </div>
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
    WhatsAppPhone: {
      get () { return this.$store.getters.get_whatsapp_phone },
      set (value) { this.$store.dispatch('set_whatsapp_phone', value) }
    },
    WhatsAppMessage: {
      get () { return this.$store.getters.get_whatsapp_message },
      set (value) { this.$store.dispatch('set_whatsapp_message', value) }
    }
  }
}
</script>
