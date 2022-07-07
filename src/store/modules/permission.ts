import { getRoutes } from '@/router/syncRouters';
import util from '@/router/util';
import { defineStore } from 'pinia';
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
