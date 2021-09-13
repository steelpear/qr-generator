<template>
  <v-container pt-1>
    <v-row align="center">
      <v-icon
        large
        class="mr-2"
      >
        {{ titleIcon }}
      </v-icon>
      <span class="sms-title text-h4 font-weight-regular" :class="{'indigo--text text--darken-3': titleBtn == 1}" @click="mode('sms')">SMS</span>
      <span class="mx-1 text-h4 font-weight-regular">/</span>
      <span class="sms-title text-h4 font-weight-regular" :class="{'indigo--text text--darken-3': titleBtn == 2}" @click="mode('call')">Звонок</span>
      <span class="mx-1 text-h4 font-weight-regular">/</span>
      <span class="sms-title text-h4 font-weight-regular" :class="{'indigo--text text--darken-3': titleBtn == 3}" @click="mode('email')">E-Mail</span>
      <v-spacer />
      <v-btn icon @click="$refs.form.reset()">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-row>
    <v-divider class="mt-5 mb-2" />
    <v-form ref="form">
      <v-container grid-list-md px-0>
        <v-row dense>
          <v-col cols="12" :md="(titleBtn === 2) ? 8 : 4">
            <v-text-field
              v-model="smsPhone"
              label="Номер телефона"
              clearable
              outlined
              :filled="titleBtn === 1 || titleBtn === 2"
              prefix="+"
              mask="###############"
              prepend-inner-icon="phone"
              hint="В международном формате"
              :rules="[rules.required]"
              :disabled="titleBtn === 3"
            />
          </v-col>
          <v-col cols="12" :md="(titleBtn === 2) ? 4 : 8">
            <v-textarea
              v-model="smsText"
              name="text"
              label="Сообщение"
              value=""
              rows="1"
              counter="100"
              clearable
              outlined
              :filled="titleBtn === 1"
              auto-grow
              prepend-inner-icon="text_fields"
              placeholder=" "
              hint="Избегайте слишком длинных сообщений."
              :disabled="titleBtn != 1"
            />
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="eMail"
              label="E-mail"
              clearable
              outlined
              :filled="titleBtn === 3"
              prepend-inner-icon="alternate_email"
              placeholder=" "
              :rules="[rules.required, rules.email]"
              :disabled="titleBtn != 3"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              v-model="emailSubject"
              name="subject"
              label="Тема письма"
              value=""
              rows="1"
              counter="30"
              clearable
              outlined
              :filled="titleBtn === 3"
              auto-grow
              prepend-inner-icon="subject"
              placeholder=" "
              hint="Избегайте слишком длинных сообщений."
              :rules="[rules.counter]"
              maxlength="30"
              :disabled="titleBtn != 3"
            />
          </v-col>
        </v-row>
        <v-textarea
          v-model="emailMessage"
          name="message"
          label="Текст письма"
          value=""
          rows="4"
          counter="100"
          clearable
          outlined
          :filled="titleBtn === 3"
          auto-grow
          prepend-inner-icon="text_fields"
          placeholder=" "
          hint="Избегайте слишком длинных сообщений."
          :disabled="titleBtn != 3"
        />
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    titleBtn: 1,
    titleIcon: 'sms',
    rules: {
      required: value => !!value || 'Необходимое поле!',
      counter: value => (value || '').length <= 30 || 'Не более 30 символов!',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Неверный e-mail!'
      }
    }
  }),
  computed: {
    smsPhone: {
      get () { return this.$store.getters.get_sms_phone },
      set (value) { this.$store.dispatch('set_sms_phone', value) }
    },
    smsText: {
      get () { return this.$store.getters.get_sms_text },
      set (value) { this.$store.dispatch('set_sms_text', value) }
    },
    eMail: {
      get () { return this.$store.getters.get_sms_email },
      set (value) { this.$store.dispatch('set_sms_email', value) }
    },
    emailSubject: {
      get () { return this.$store.getters.get_sms_email_subject },
      set (value) { this.$store.dispatch('set_sms_email_subject', value) }
    },
    emailMessage: {
      get () { return this.$store.getters.get_sms_email_message },
      set (value) { this.$store.dispatch('set_sms_email_message', value) }
    }
  },
  watch: {
    titleBtn (val) {
      this.$store.dispatch('set_sms_title_btn', val)
    }
  },
  mounted () {
    this.$store.dispatch('set_sms_title_btn', this.titleBtn)
  },
  methods: {
    mode (e) {
      if (e === 'sms') {
        this.titleIcon = 'sms'
        this.titleBtn = 1
      } else if (e === 'call') {
        this.titleIcon = 'phone'
        this.titleBtn = 2
      } else {
        this.titleIcon = 'alternate_email'
        this.titleBtn = 3
      }
    }
  }
}
</script>

<style>
  .sms-title {cursor:pointer;}
</style>
