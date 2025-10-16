import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import './index.scss'
import router from './router'
import { createPinia } from 'pinia'
// import NaiveUI from 'naive-ui'
import Directive from "./directive"
//@ts-ignore
import contextmenu from 'vue3-contextmenu'

// eventbus
import emitter from './utils/eventbus'
import axios from 'axios'
// 主题切换逻辑已移至 App.vue，跟随 webviewMsgStore.themeMode 与系统偏好

const app = createApp(App)

// EVENT BUS
app.config.globalProperties.$bus = emitter
// import 'vue3-contextmenu/dist/vue3-contextmenu.css' // 右键需要导入的样式
app.use(contextmenu)// 右键
app.use(router)
// app.use(NaiveUI)
app.use(Directive)
app.use(createPinia())
app.mount('#app')


const pwd = localStorage.getItem("__password_txt")
const url = localStorage.getItem("search-url")

if (pwd && url) {
    axios.get(`${url}/v1/tv/identify`, { params: { password: pwd } }).then((res) => {
        if (res.data) {
            localStorage.setItem("rule_password", res.data.password)
            localStorage.setItem("auth", res.data.token)

            axios.get(`${url}/v1/tv/rule/get`).then(res => {
                localStorage.setItem("create-group-rule-yaml", res.data)
            }).catch(() => {})
        }
    })
}

axios.interceptors.request.use((config: any) => {
    config.headers["session-id"] = localStorage.getItem("auth")

    return config;
},
    (err) => {
        console.log(err);
    })