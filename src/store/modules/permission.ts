// export

import { getFakeRoutes } from '@/router/syncRouters';
import { defineStore } from 'pinia';

import type { PermissionState } from '../typings/permission';

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routes: [],
  }),
  actions: {
    async addSyncRoutes() {
      const routes = await getFakeRoutes();
      this.routes = routes;
      return routes;
    },
  },
});
