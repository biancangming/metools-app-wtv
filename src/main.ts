import { createApp } from 'vue'
import App from './app.vue'
import './assets/styles/tailwind.css'

// 创建 Vue 应用实例
const app = createApp(App)

// 挂载应用到 DOM
app.mount('#app')