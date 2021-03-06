import { createApp } from 'vue'
import App from './App.vue'
import { store } from '@/lib'

const app = createApp(App).mount('#app')
app.use(store)
