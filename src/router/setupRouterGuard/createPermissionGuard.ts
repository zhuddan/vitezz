import type { Router } from 'vue-router';

import { usePermissionStore } from '@/store/modules/permission';

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