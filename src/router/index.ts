import { createRouter, createWebHistory } from 'vue-router';
import { useGuard } from './guard';

const routes: VueRouteRecordRaw[] = [
  {
    path: '/',
    meta: {
      title: '首页',
    },
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/login',
    meta: {
      title: '登录',
      auth: false,
    },
    component: () => import('@/views/Login.vue'),
  },

  {
    path: '/redirect/:path(.*)',
    meta: {
      auth: false,
    },
    component: () => import('@/views/redirect.vue'),
  },
  {
    path: '/about',
    meta: {
      title: '关于',
    },
    component: () => import('@/views/About.vue'),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
useGuard(router);
export default router;
