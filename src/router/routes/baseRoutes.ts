import type { RouteRecordRaw } from 'vue-router';

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: {
      title: '首页',
      auth: false,
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
      title: '404 not-find',
    },
    component: () => import('@/views/404.vue'),
  },
];
