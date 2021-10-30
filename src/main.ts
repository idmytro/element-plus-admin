import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
import 'element-plus/lib/theme-chalk/index.css'
import '@/styles/style.scss'
import '@/icons'
import ElementPlus from 'element-plus'
import components from '@/components'
import 'windi.css'
import Parse from 'parse'

/*
VUE_APP_PARSE_APP_ID=7Pbcc1FBnDIy6msm3tuSy8v8FFgSgaZP1VvrGiha
VUE_APP_PARSE_JS_KEY=Kh8Gh6CukdbWEsLvTZ381DpYNe1P8S7UcEchGiWf
VUE_APP_PARSE_SERVER_URL=https://parseapi.back4app.com/

*/

const { VUE_APP_PARSE_APP_ID = '', VUE_APP_PARSE_JS_KEY, VUE_APP_PARSE_SERVER_URL = '' } = process.env

Parse.initialize(VUE_APP_PARSE_APP_ID, VUE_APP_PARSE_JS_KEY)
Parse.serverURL = VUE_APP_PARSE_SERVER_URL

const app = createApp(App)

app.provide('$store', store)
app.use(store)
app.use(router)
app.use(i18n)
app.use(ElementPlus)
app.use(components)
app.config.globalProperties.$Parse = Parse

router.isReady()
  .then(() => app.mount('#app'))
