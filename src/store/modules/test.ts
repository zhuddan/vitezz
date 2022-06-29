// export

import { defineStore } from 'pinia';

import type { TestState } from '../typings/test';

export const useTestStore = defineStore({
  id: 'test',
  state: (): TestState => ({
    count: 0,
  }),
  actions: {
    increase() {
      this.count++;
    },
    decrease() {
      this.count--;
    },
  },
});
