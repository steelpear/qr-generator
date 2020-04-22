import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const state = () => ({
  text: '',
  smsData: {
    smsPhone: '',
    smsText: '',
    eMail: '',
    emailSubject: '',
    emailMessage: '',
    titleBtn: ''
  },
  vcardData: {
    vCardSurname: '',
    vCardName: '',
    vCardPatronymic: '',
    vCardPhone: '',
    vCardEmail: '',
    vCardLink: '',
    vCardPractice: '',
    vCardNote: ''
  },
  geoData: [55.75115178233711, 37.61898136805887],
  wifiData: {
    networkName: '',
    networkPassword: '',
    networkType: 'WPA/WPA2'
  },
  linkData: '',
  whatsAppPhone: '',
  whatsAppMessage: '',
  skypeData: '',
  skypeMode: 1,
  telegramData: '',
  youtubeData: '',
  youtubeMode: 1
})

export const getters = {
  get_text: state => state.text,
  get_sms_phone: state => state.smsData.smsPhone,
  get_sms_text: state => state.smsData.smsText,
  get_sms_email: state => state.smsData.eMail,
  get_sms_email_subject: state => state.smsData.emailSubject,
  get_sms_email_message: state => state.smsData.emailMessage,
  get_sms_title_btn: state => state.smsData.titleBtn,
  get_sms: (state) => {
    let sms = ''
    if (state.smsData.titleBtn === 1) {
      sms = 'smsto:+' + state.smsData.smsPhone + ':' + state.smsData.smsText
    } else if (state.smsData.titleBtn === 2) {
      sms = 'tel:+' + state.smsData.smsPhone
    } else if (state.smsData.titleBtn === 3) {
      sms = 'mailto:' + state.smsData.eMail + '?subject=' + state.smsData.emailSubject + '&body=' + state.smsData.emailMessage
    } else {
      sms = ''
    }
    return sms
  },
  get_vcard_surname: state => state.vcardData.vCardSurname,
  get_vcard_name: state => state.vcardData.vCardName,
  get_vcard_patronymic: state => state.vcardData.vCardPatronymic,
  get_vcard_phone: state => state.vcardData.vCardPhone,
  get_vcard_email: state => state.vcardData.vCardEmail,
  get_vcard_link: state => state.vcardData.vCardLink,
  get_vcard_practice: state => state.vcardData.vCardPractice,
  get_vcard_note: state => state.vcardData.vCardNote,
  get_vcard: (state) => {
    let vcard = ''
    if (state.vcardData.vCardName || state.vcardData.vCardSurname || state.vcardData.vCardPatronymic || state.vcardData.vCardPhone || state.vcardData.vCardEmail || state.vcardData.vCardLink || state.vcardData.vCardPractice || state.vcardData.vCardNote) {
      vcard = 'BEGIN:VCARD\nVERSION:4.0\r\nFN:' + state.vcardData.vCardSurname + ' ' + state.vcardData.vCardName + ' ' + state.vcardData.vCardPatronymic + '\r\nN:' + state.vcardData.vCardSurname + ';' + state.vcardData.vCardName + ';' + state.vcardData.vCardPatronymic + '\r\nTEL;VALUE=uri:tel:' + '+' + state.vcardData.vCardPhone + '\r\nEMAIL:' + state.vcardData.vCardEmail + '\r\nTITLE:' + state.vcardData.vCardPractice + '\r\nNOTE:' + state.vcardData.vCardNote + '\r\nURL:' + state.vcardData.vCardLink + '\r\nEND:VCARD'
    }
    return vcard
  },
  get_geo: state => state.geoData,
  get_geo_data: (state) => {
    const geo = 'GEO:' + state.geoData
    return geo
  },
  get_wifi_name: state => state.wifiData.networkName,
  get_wifi_password: state => state.wifiData.networkPassword,
  get_wifi_type: state => state.wifiData.networkType,
  get_wifi: (state) => {
    let wifi = ''
    const name = (!state.wifiData.networkName) ? '' : state.wifiData.networkName
    const password = (!state.wifiData.networkPassword) ? '' : state.wifiData.networkPassword
    const type = (state.wifiData.networkType === 'Без защиты') ? 'OPEN' : state.wifiData.networkType
    if (state.wifiData.networkName || state.wifiData.networkPassword || state.wifiData.networkType) {
      wifi = 'WIFI:S:' + name + ';T:' + type + ';P:' + password + ';;'
    }
    return wifi
  },
  get_link: state => state.linkData,
  get_whatsapp_phone: state => state.whatsAppPhone,
  get_whatsapp_message: state => state.whatsAppMessage,
  get_whatsapp: (state) => {
    let mess = ''
    if (state.whatsAppPhone || state.whatsAppMessage) { mess = 'https://wa.me/' + state.whatsAppPhone + '?text=' + state.whatsAppMessage }
    return mess
  },
  get_skype_data: state => state.skypeData,
  get_skype_mode: state => state.skypeMode,
  get_skype: (state) => {
    let skype = ''
    if (state.skypeData && state.skypeMode === 1) { skype = 'skype:' + state.skypeData + '?call' } else if (state.skypeData && state.skypeMode === 2) { skype = 'skype:' + state.skypeData + '?chat' } else { skype = '' }
    return skype
  },
  get_telegram_data: state => state.telegramData,
  get_telegram: (state) => {
    let telegram = ''
    if (state.telegramData) { telegram = 'https://t.me/' + state.telegramData }
    return telegram
  },
  get_youtube_data: state => state.youtubeData,
  get_youtube_mode: state => state.youtubeMode,
  get_youtube: (state) => {
    let youtube = ''
    if (state.youtubeData && state.youtubeMode === 1) { youtube = 'https://www.youtube.com/watch?v=' + state.youtubeData } else if (state.youtubeData && state.youtubeMode === 2) { youtube = 'https://www.youtube.com/user/' + state.youtubeData } else { youtube = '' }
    return youtube
  }
}

export const mutations = {
  set_text: (state, payload) => { state.text = payload },
  set_sms_phone: (state, payload) => { state.smsData.smsPhone = payload },
  set_sms_text: (state, payload) => { state.smsData.smsText = payload },
  set_sms_email: (state, payload) => { state.smsData.eMail = payload },
  set_sms_email_subject: (state, payload) => { state.smsData.emailSubject = payload },
  set_sms_email_message: (state, payload) => { state.smsData.emailMessage = payload },
  set_sms_title_btn: (state, payload) => { state.smsData.titleBtn = payload },
  set_vcard_surname: (state, payload) => { state.vcardData.vCardSurname = payload },
  set_vcard_name: (state, payload) => { state.vcardData.vCardName = payload },
  set_vcard_patronymic: (state, payload) => { state.vcardData.vCardPatronymic = payload },
  set_vcard_phone: (state, payload) => { state.vcardData.vCardPhone = payload },
  set_vcard_email: (state, payload) => { state.vcardData.vCardEmail = payload },
  set_vcard_link: (state, payload) => { state.vcardData.vCardLink = payload },
  set_vcard_practice: (state, payload) => { state.vcardData.vCardPractice = payload },
  set_vcard_note: (state, payload) => { state.vcardData.vCardNote = payload },
  set_geo: (state, payload) => { state.geoData = payload },
  set_wifi_name: (state, payload) => { state.wifiData.networkName = payload },
  set_wifi_password: (state, payload) => { state.wifiData.networkPassword = payload },
  set_wifi_type: (state, payload) => { state.wifiData.networkType = payload },
  set_link: (state, payload) => { state.linkData = payload },
  set_whatsapp_phone: (state, payload) => { state.whatsAppPhone = payload },
  set_whatsapp_message: (state, payload) => { state.whatsAppMessage = payload },
  set_skype_data: (state, payload) => { state.skypeData = payload },
  set_skype_mode: (state, payload) => { state.skypeMode = payload },
  set_telegram_data: (state, payload) => { state.telegramData = payload },
  set_youtube_data: (state, payload) => { state.youtubeData = payload },
  set_youtube_mode: (state, payload) => { state.youtubeMode = payload }
}

export const actions = {
  set_text: ({ commit }, payload) => { commit('set_text', payload) },
  set_sms_phone: ({ commit }, payload) => { commit('set_sms_phone', payload) },
  set_sms_text: ({ commit }, payload) => { commit('set_sms_text', payload) },
  set_sms_email: ({ commit }, payload) => { commit('set_sms_email', payload) },
  set_sms_email_subject: ({ commit }, payload) => { commit('set_sms_email_subject', payload) },
  set_sms_email_message: ({ commit }, payload) => { commit('set_sms_email_message', payload) },
  set_sms_title_btn: ({ commit }, payload) => { commit('set_sms_title_btn', payload) },
  set_vcard_surname: ({ commit }, payload) => { commit('set_vcard_surname', payload) },
  set_vcard_name: ({ commit }, payload) => { commit('set_vcard_name', payload) },
  set_vcard_patronymic: ({ commit }, payload) => { commit('set_vcard_patronymic', payload) },
  set_vcard_phone: ({ commit }, payload) => { commit('set_vcard_phone', payload) },
  set_vcard_email: ({ commit }, payload) => { commit('set_vcard_email', payload) },
  set_vcard_link: ({ commit }, payload) => { commit('set_vcard_link', payload) },
  set_vcard_practice: ({ commit }, payload) => { commit('set_vcard_practice', payload) },
  set_vcard_note: ({ commit }, payload) => { commit('set_vcard_note', payload) },
  set_geo: ({ commit }, payload) => { commit('set_geo', payload) },
  set_wifi_name: ({ commit }, payload) => { commit('set_wifi_name', payload) },
  set_wifi_password: ({ commit }, payload) => { commit('set_wifi_password', payload) },
  set_wifi_type: ({ commit }, payload) => { commit('set_wifi_type', payload) },
  set_link: ({ commit }, payload) => { commit('set_link', payload) },
  set_whatsapp_phone: ({ commit }, payload) => { commit('set_whatsapp_phone', payload) },
  set_whatsapp_message: ({ commit }, payload) => { commit('set_whatsapp_message', payload) },
  set_skype_data: ({ commit }, payload) => { commit('set_skype_data', payload) },
  set_skype_mode: ({ commit }, payload) => { commit('set_skype_mode', payload) },
  set_telegram_data: ({ commit }, payload) => { commit('set_telegram_data', payload) },
  set_youtube_data: ({ commit }, payload) => { commit('set_youtube_data', payload) },
  set_youtube_mode: ({ commit }, payload) => { commit('set_youtube_mode', payload) }
}
