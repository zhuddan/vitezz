import type { AppState } from '../typings/app';

import { defineStore } from 'pinia';
import { getAppCollapse, setAppCollapse } from '@/utils/cache';

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    collapse: getAppCollapse(),
  }),
  actions: {
    toggleCollapse() {
      this.collapse = !this.collapse;
      setAppCollapse(this.collapse);
    },
  },
  getters: {
    isCollapse: state => state.collapse,
  },
});
