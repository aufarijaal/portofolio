import { createApp } from 'vue'
import App from './App.vue'
import './css/tailwind.css'
import anime from 'animejs'

const app = createApp(App)
app.config.globalProperties.$animejs = anime
app.mount('#app')
