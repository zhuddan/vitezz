import { getInfo, login } from '@/api/login';
import { removeToken, setToken } from '@/utils/cache';
import { defineStore } from 'pinia';

import type { UserState } from '../typings/user';
import { usePermissionStore } from './permission';
import { useTestStore } from './test';

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    info: null,
    roles: [],
    permissions: [],
  }),
  actions: {
    async login(username: string, password: string, code: string, uuid: string) {
      const res = await login(username, password, code, uuid);
      setToken(res.token);
    },
    logout() {
      this.resetAllState();
    },
    async getInfo() {
      const res = await getInfo();
      this.info = res.info;
      this.roles = res.roles;
      this.permissions = res.permissions;
    },
    resetAllState() {
      const permissionStore = usePermissionStore();
      const testStore = useTestStore();
      permissionStore.resetState();
      testStore.resetState();
      this.$reset();
      removeToken();
    },
  },
});
