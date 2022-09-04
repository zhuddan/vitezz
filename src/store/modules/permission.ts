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
      await sleep(1);
      this.routes = asyncRoutes;
      asyncRoutes.forEach((e) => {
        router.addRoute(e);
      });
    },
  },
});
