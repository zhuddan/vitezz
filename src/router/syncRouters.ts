// 动态路由
export const syncRoutes: VueRouteRecordRaw[] = [
  {
    path: '/about',
    meta: {
      title: '关于',
    },
    component: () => import('@/views/About.vue'),
  },
];

export function getFakeRoutes(): Promise<VueRouteRecordRaw[]> {
  return new Promise((resolve) => {
    const t = setTimeout(() => {
      clearTimeout(t);
      resolve(syncRoutes);
    }, 200);
  });
}
