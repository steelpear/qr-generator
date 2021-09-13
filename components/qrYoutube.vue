<template>
  <v-container pt-1>
    <v-row align="center">
      <v-icon
        large
        class="mr-2"
      >
        mdi-youtube
      </v-icon>
      <div class="text-h4 font-weight-regular">
        YouTube <span class="headline">({{ modeTitle }})</span>
      </div>
      <v-spacer />
      <v-btn icon @click="reset">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-row>
    <v-divider class="mt-5" />
    <v-row align="start" justify="center" dense class="mt-8">
      <v-col cols="12" md="9">
        <v-form ref="form">
          <v-text-field
            v-model="youtube"
            :label="buttonToggle === 1 ? 'Видеоролик' : 'Канал'"
            placeholder=" "
            clearable
            outlined
            :rules="[rules.required]"
            :prepend-inner-icon="buttonToggle === 1 ? 'video_library' : 'ondemand_video'"
            :hint="buttonToggle === 1 ? 'ID видеоролика. Например A8N4_cjLXH8' : 'Название канала'"
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
            @click="mode('clip')"
          >
            <v-icon large>
              video_library
            </v-icon>
          </v-btn>
          <v-btn
            text
            icon
            large
            :color="buttonToggle === 2 ? 'indigo' : 'grey'"
            class="ma-1"
            @click="mode('channel')"
          >
            <v-icon large>
              ondemand_video
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
    modeTitle: 'Ролик',
    rules: {
      required: value => !!value || 'Необходимое поле'
    }
  }),
  computed: {
    youtube: {
      get () { return this.$store.getters.get_youtube_data },
      set (value) { this.$store.dispatch('set_youtube_data', value) }
    }
  },
  mounted () {
    this.buttonToggle = this.$store.getters.get_youtube_mode
    this.$watch(vm => [vm.buttonToggle], (val) => {
      this.$store.dispatch('set_youtube_mode', this.buttonToggle)
    }, { immediate: true })
  },
  methods: {
    mode (e) {
      if (e === 'clip') {
        this.buttonToggle = 1
        this.modeTitle = 'Ролик'
      }
      if (e === 'channel') {
        this.buttonToggle = 2
        this.modeTitle = 'Канал'
      }
    },
    reset () {
      this.$refs.form.reset()
      this.buttonToggle = 1
      this.modeTitle = 'Ролик'
    }
  }
}
</script>
