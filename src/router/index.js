import { createRouter, createWebHistory } from 'vue-router'

// 컴포넌트 임포트
import Login from '../views/Login.vue'
import Main from '../components/layout/Main.vue'
const routes = [
  {
    path: '/', component: Main,
    // children: [
    //   { path: '/about', component: About },
    // ]
  },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
