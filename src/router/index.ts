import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/app/Negocio'
  },
  {
    path: '/app/negocio',
    component: () => import ('../views/Negocio.vue')
  },
  {
    path: '/app/tecnico',
    component: () => import ('../views/Tecnico.vue')
  },
  {
    path: '/app/kpi',
    component: () => import ('../views/Kpi.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
