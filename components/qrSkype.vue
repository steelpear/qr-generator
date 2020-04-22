<template>
  <v-container pt-1>
    <v-row>
      <v-icon
        large
        class="mr-2"
      >
        mdi-skype-business
      </v-icon>
      <span class="display-1 font-weight-regular">Skype <span class="headline">({{ modeTitle }})</span></span>
      <v-spacer />
      <v-btn icon @click="reset">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-row>
    <v-divider class="mb-5" />
    <v-row align="start" justify="center" dense class="mt-10">
      <v-col cols="12" md="9">
        <v-form ref="form">
          <v-text-field
            v-model="skypeAccount"
            label="Аккаунт Skype"
            placeholder=" "
            clearable
            outlined
            :rules="[rules.required]"
            prepend-inner-icon="person"
            hint="Для конференции или мультичата разделяйте аккаунты точкой с запятой."
          />
        </v-form>
      </v-col>
      <v-col cols="12" md="3">
        <v-row align="center" justify="end">
          <v-btn
            text
            icon
            large
            :color="buttonToggle === 1 ? 'indigo' : 'grey'"
            class="ma-1"
            @click="mode('call')"
          >
            <v-icon large>
              call
            </v-icon>
          </v-btn>
          <v-btn
            text
            icon
            large
            :color="buttonToggle === 2 ? 'indigo' : 'grey'"
            class="ma-1"
            @click="mode('chat')"
          >
            <v-icon large>
              chat
            </v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    buttonToggle: null,
    modeTitle: 'Звонок',
    rules: {
      required: value => !!value || 'Необходимое поле'
    }
  }),
  computed: {
    skypeAccount: {
      get () { return this.$store.getters.get_skype_data },
      set (value) { this.$store.dispatch('set_skype_data', value) }
    }
  },
  mounted () {
    this.buttonToggle = this.$store.getters.get_skype_mode
    this.$watch(vm => [vm.buttonToggle], (val) => {
      this.$store.dispatch('set_skype_mode', this.buttonToggle)
    }, { immediate: true })
  },
  methods: {
    mode (e) {
      if (e === 'call') {
        this.buttonToggle = 1
        this.modeTitle = 'Звонок'
      }
      if (e === 'chat') {
        this.buttonToggle = 2
        this.modeTitle = 'Чат'
      }
    },
    reset () {
      this.$refs.form.reset()
      this.buttonToggle = 1
      this.modeTitle = 'Звонок'
    }
  }
}
</script>
