import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // 懒加载组件
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/demo1',
    name: 'demo1',
    // 懒加载组件
    component: () => import('../views/Demo1View.vue')
  },
  {
    path: '/demo2',
    name: 'demo2',
    // 懒加载组件
    component: () => import('../views/Demo2View.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router