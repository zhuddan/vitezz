import { useSettings } from '@/hooks/settings';
import { usePermissionStore } from '@/store/modules/permission';
import { getToken } from '@/utils/cache';
import type { Router } from 'vue-router';
const settings = useSettings();
export function useGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    document.title = `${settings.VITE_APP_TITLE} | ${to.meta.title}`;
    const p = usePermissionStore();
    if (getToken()) {
      if (!p.routes.length) {
        const rs = await p.addSyncRoutes();
        for (let index = 0; index < rs.length; index++) {
          const element = rs[index];
          console.log(element);
          router.addRoute(element);
        }
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
