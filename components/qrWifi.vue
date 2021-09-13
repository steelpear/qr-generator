<template>
  <v-container pt-1>
    <v-row align="center">
      <v-icon
        large
        class="mr-2"
      >
        mdi-wifi
      </v-icon>
      <div class="text-h4 font-weight-regular">
        Wi-Fi
      </div>
      <v-spacer />
      <v-btn icon @click="$refs.form.reset()">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-row>
    <v-divider class="mt-5" />
    <v-form ref="form">
      <v-row class="mt-5">
        <v-col cols="12">
          <v-text-field
            v-model="wifiNetworkName"
            label="Название сети (SSID)"
            placeholder=" "
            clearable
            outlined
            :rules="[rules.required]"
            prepend-inner-icon="perm_scan_wifi"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="wifiNetworkPassword"
            label="Пароль"
            placeholder=" "
            clearable
            outlined
            prepend-inner-icon="vpn_key"
            type="password"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="wifiNetworkType"
            :items="typesNetwork"
            menu-props="auto"
            label="Тип шифрования"
            placeholder=" "
            prepend-inner-icon="cell_wifi"
            outlined
          />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    typesNetwork: [
      'WPA/WPA2',
      'WEP',
      'Без защиты'
    ],
    rules: {
      required: value => !!value || 'Необходимое поле'
    }
  }),
  computed: {
    wifiNetworkName: {
      get () { return this.$store.getters.get_wifi_name },
      set (value) { this.$store.dispatch('set_wifi_name', value) }
    },
    wifiNetworkPassword: {
      get () { return this.$store.getters.get_wifi_password },
      set (value) { this.$store.dispatch('set_wifi_password', value) }
    },
    wifiNetworkType: {
      get () { return this.$store.getters.get_wifi_type },
      set (value) { this.$store.dispatch('set_wifi_type', value) }
    }
  }
}
</script>
