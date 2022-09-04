import { asyncRoutes } from '@/router/routes/asyncRoutes';
import { defineStore } from 'pinia';
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
      await sleep();
      this.routes = asyncRoutes;
      asyncRoutes.forEach((e) => {
        router.addRoute(e);
      });
    },
  },
});
