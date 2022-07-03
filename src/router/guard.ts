import { useSettings } from '@/hooks/settings';
import { getToken } from '@/utils/cache';
import type { Router } from 'vue-router';
const settings = useSettings();
export function useGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    document.title = `${settings.VITE_APP_TITLE} | ${to.meta.title}`;
    console.log(getToken());
    if (getToken()) {
      if (to.path == '/login') {
        next('/');
      } else {
        next();
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
