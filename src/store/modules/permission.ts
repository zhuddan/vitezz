import { defineStore } from 'pinia';

import router from '@/router';
import { asyncRoutes } from '@/router/routes/asyncRoutes';
import { sleep } from '@/utils';

import type { PermissionState } from '../typings/permission';

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routes: [],
  }),
  actions: {
    async addSyncRoutes() {
      const object = await import.meta.glob('../../views/pages/**/*.vue');
      const routes = [];
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          const path = key.replace('../../views/pages', '').replace('.vue', '');
          const item = {
            path: path,
            component: object[key],
            meta: {
              auth: false,
            },
          };
          router.addRoute(item);
          routes.push(item);
        }
      }

      await sleep(1);
      this.routes = routes;
      asyncRoutes.forEach((e) => {
        router.addRoute(e);
      });
    },
  },
});
