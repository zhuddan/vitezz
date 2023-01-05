import type { Router } from 'vue-router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

export function createProgressGuard(router: Router) {
  router.beforeEach(async () => {
    nProgress.start();
    return true;
  });

  router.afterEach(async () => {
    nProgress.done();
    return true;
  });
}