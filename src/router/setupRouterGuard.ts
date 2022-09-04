import { usePermissionStore } from '@/store/modules/permission';
import { useUserStore } from '@/store/modules/user';
import { getToken } from '@/utils/cache';
import type { Router } from 'vue-router';

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const permission = usePermissionStore();
    if (getToken()) {
      const userStore = useUserStore();
      if (!userStore.info) {
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
