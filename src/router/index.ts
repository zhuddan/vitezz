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
    path: '/:path(.*)',
    meta: {
      title: '关于',
    },
    component: () => import('@/views/Error/404.vue'),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
useGuard(router);
export default router;
