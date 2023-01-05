import { usePermissionStore } from '@/store/modules/permission';
import type { Router } from 'vue-router';

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const permission = usePermissionStore();
    if (!permission.routes.length) {
      await permission.addSyncRoutes();
      next({
        path: to.path,
        replace: true,
      });
    }
    else {
      next();
    }
  });
}