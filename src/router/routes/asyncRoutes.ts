import type { RouteRecordRaw } from 'vue-router';

// 动态路由
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/list',
    meta: {
      title: '列表',
      auth: false,
    },
    component: () => import('@/views/List.vue'),
  },
  {
    path: '/detail/:id',
    meta: {
      title: '列表详情',
    },
    component: () => import('@/views/About.vue'),
  },
];
