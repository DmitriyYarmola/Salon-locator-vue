import { createApp } from 'vue'
import App from './App.vue'
import { store } from '@/lib'
import '@/styles/global.style.scss'
import { router } from '@/routers'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
