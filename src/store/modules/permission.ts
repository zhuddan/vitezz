import { defineStore } from 'pinia';

import { getRoutes } from '@/router/routes/syncRouters';
import util from '@/router/util';

import type { PermissionState } from '../typings/permission';

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routes: [],
  }),
  actions: {
    async addSyncRoutes() {
      const routes = await getRoutes();
      this.routes = routes;
      util.addRoutes(this.routes);
    },
    removeSyncRoutes() {
      util.removeRoutes(this.routes);
    },
    resetState() {
      this.removeSyncRoutes();
      this.$reset();
    },
  },
});
