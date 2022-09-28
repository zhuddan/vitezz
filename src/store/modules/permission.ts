import { defineStore } from 'pinia';
import type { RouteRecordRaw } from 'vue-router';

import BlankView from '@/components/BlankView.vue';
import router from '@/router';
import { homeRoutes } from '@/router/routes/baseRoutes';
import { capitalize, handleTree } from '@/utils';

import type { PermissionState } from '../typings/permission';

interface Item {
  path: string[];
  comp: CompPromFn;
}
type CompPromFn = () => Promise<{
  [key: string]: any;
}>;

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routes: [],
  }),
  actions: {
    async addSyncRoutes() {
      const object = await import.meta.glob('../../views/pages/**/*.vue');
      const t: Item[] = [];
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          const path = key.replace('../../views/pages', '').replace('.vue', '');
          t.push({
            path: path.split('/').filter((e) => !!e),
            comp: object[key],
          });
        }
      }
      const asyncRoutes = getRouteTree(t) as unknown as RouteRecordRaw[];

      this.routes = [homeRoutes, ...asyncRoutes];
      asyncRoutes.forEach((e) => {
        router.addRoute(e);
      });
    },
  },
});

let id = 1;
function getRouteTree(list: Item[]) {
  const routeList: {
    signal: string;
    path: string;
    id: number;
    parentId: number;
    component: any;
    meta: {
      title: string;
    };
  }[] = [];
  function loop(list: Item[]) {
    list.forEach((e) => {
      const array = e.path;
      for (let index = 0; index < array.length; index++) {
        const realPath = array[index];
        if (realPath) {
          const signal = e.path.filter((e, i) => i <= index).join('/');
          if (!routeList.find((e) => e.signal == signal)) {
            const pid = e.path.filter((e, i) => i <= index - 1).join('/');
            const parentId = routeList.find((e) => e.signal == pid)?.id || 0;
            routeList.push({
              signal,
              path: `${parentId == 0 ? '/' : ''}${realPath}`,
              id: id++,
              meta: {
                title: capitalize(realPath),
              },
              parentId,
              component: index == array.length - 1 ? e.comp : BlankView,
            });
          }
        }
      }
    });
  }
  loop(list);
  return handleTree(routeList);
}
