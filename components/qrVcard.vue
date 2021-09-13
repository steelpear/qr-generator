<template>
  <v-container pt-1>
    <v-row align="center">
      <v-icon
        large
        class="mr-2"
      >
        mdi-card-account-details-outline
      </v-icon>
      <div class="text-h4 font-weight-regular">
        Визитка VCard
      </div>
      <v-spacer />
      <v-btn icon @click="$refs.form.reset()">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-row>
    <v-divider class="my-5" />
    <v-form ref="form">
      <v-text-field
        v-model="vCardSurname"
        label="Фамилия"
        clearable
        outlined
        class="body-1"
      />
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="vCardName"
            label="Имя"
            clearable
            outlined
            class="body-1"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="vCardPatronymic"
            label="Отчество"
            clearable
            outlined
            class="body-1"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="vCardPhone"
            label="Телефон"
            clearable
            outlined
            prefix="+"
            placeholder=" "
            mask="###############"
            prepend-inner-icon="phone"
            hint="В международном формате"
            class="body-1 pt-0 mt-1"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="vCardEmail"
            label="E-Mail"
            placeholder=" "
            clearable
            outlined
            prepend-inner-icon="alternate_email"
            class="caption pt-0 mt-1"
            :rules="[rules.email]"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="vCardLink"
            label="Сайт"
            placeholder=" "
            clearable
            outlined
            prepend-inner-icon="public"
            hint="Сайт, аккаунт в соцсети и т.д."
            class="caption pt-0 mt-1"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="vCardPractice"
            label="Вид деятельности"
            placeholder=" "
            clearable
            outlined
            prepend-inner-icon="local_library"
            hint="Профессия, хобби и т.д."
            class="caption"
          />
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="vCardNote"
            label="Примечание"
            placeholder=" "
            clearable
            outlined
            prepend-inner-icon="text_fields"
            hint="Короткое примечание."
            class="caption"
            counter="40"
            maxlength="40"
            :rules="[rules.counter]"
          />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    rules: {
      required: value => !!value || 'Необходимое поле!',
      counter: value => (value || '').length <= 40 || 'Не более 40 символов!',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Неверный e-mail!'
      }
    }
  }),
  computed: {
    vCardSurname: {
      get () { return this.$store.getters.get_vcard_surname },
      set (value) { this.$store.dispatch('set_vcard_surname', value) }
    },
    vCardName: {
      get () { return this.$store.getters.get_vcard_name },
      set (value) { this.$store.dispatch('set_vcard_name', value) }
    },
    vCardPatronymic: {
      get () { return this.$store.getters.get_vcard_patronymic },
      set (value) { this.$store.dispatch('set_vcard_patronymic', value) }
    },
    vCardPhone: {
      get () { return this.$store.getters.get_vcard_phone },
      set (value) { this.$store.dispatch('set_vcard_phone', value) }
    },
    vCardEmail: {
      get () { return this.$store.getters.get_vcard_email },
      set (value) { this.$store.dispatch('set_vcard_email', value) }
    },
    vCardLink: {
      get () { return this.$store.getters.get_vcard_link },
      set (value) { this.$store.dispatch('set_vcard_link', value) }
    },
    vCardPractice: {
      get () { return this.$store.getters.get_vcard_practice },
      set (value) { this.$store.dispatch('set_vcard_practice', value) }
    },
    vCardNote: {
      get () { return this.$store.getters.get_vcard_note },
      set (value) { this.$store.dispatch('set_vcard_note', value) }
    }
  }
}
</script>
