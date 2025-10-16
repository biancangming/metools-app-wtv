import { createRouter, createWebHashHistory } from 'vue-router'
import DashBoard from "@/views/Dashbord/Index.vue"
// import Rule from "@/views/Rule/Index.vue"
// import SilentGuardian from "@/views/SilentGuardian.vue"
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: DashBoard,
      meta: {
        title: '首页'
      }
    },
  ]
})

export default router
