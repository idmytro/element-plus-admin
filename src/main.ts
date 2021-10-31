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
import './parse.js'

const {
  VUE_APP_TITLE,
} = process.env

const app = createApp(App)

app.provide('$store', store)
app.use(store)
app.use(router)
app.use(i18n)
app.use(ElementPlus)
app.use(components)
app.config.globalProperties.$Parse = Parse
app.config.globalProperties.$title = VUE_APP_TITLE

router.isReady()
  .then(() => app.mount('#app'))
