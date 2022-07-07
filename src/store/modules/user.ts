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
    login(username: string, password: string, code: string, uuid: string) {
      return login(username, password, code, uuid).then((res) => {
        setToken(res.token);
      });
    },
    resetAllState() {
      const permissionStore = usePermissionStore();
      const testStore = useTestStore();
      permissionStore.$reset();
      testStore.$reset();
      this.$reset();
    },
    logout() {
      removeToken();
      this.resetAllState();
    },
    getInfo() {
      return getInfo().then((res) => {
        this.info = res.info;
        this.roles = res.roles;
        this.permissions = res.permissions;
      });
    },
  },
});
