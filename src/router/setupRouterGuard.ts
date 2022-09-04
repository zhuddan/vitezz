import type { Router } from 'vue-router';

import { usePermissionStore } from '@/store/modules/permission';
import { useUserStore } from '@/store/modules/user';
import { getToken } from '@/utils/cache';

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const permission = usePermissionStore();
    if (getToken()) {
      const userStore = useUserStore();
      if (!userStore.user) {
        await userStore.getInfo();
      }
      if (!permission.routes.length) {
        await permission.addSyncRoutes();
        next({
          path: to.path,
          replace: true,
        });
      } else {
        if (to.path == '/login') {
          next('/');
        } else {
          next();
        }
      }
    } else {
      if (to.meta.auth == false) {
        next();
      } else {
        next('/login');
      }
    }
  });
}
