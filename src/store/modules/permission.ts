import { asyncRoutes } from '@/router/routes/asyncRoutes';
import { defineStore } from 'pinia';

import { getRoutes } from '@/router/routes/syncRouters';
import util from '@/router/util';

import type { PermissionState } from '../typings/permission';
import { sleep } from '@/utils';
import router from '@/router';

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
