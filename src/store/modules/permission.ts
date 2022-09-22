import { defineStore } from 'pinia';

import router from '@/router';
import { asyncRoutes } from '@/router/routes/asyncRoutes';
import { sleep } from '@/utils';

import type { PermissionState } from '../typings/permission';
type d = () => Promise<{
  [key: string]: any;
}>;
interface dddd {
  path: string[];
  comp: d;
}
export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routes: [],
  }),
  actions: {
    async addSyncRoutes() {
      const object = await import.meta.glob('../../views/pages/**/*.vue');
      const routes = [];
      const t: dddd[] = [];
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          const path = key.replace('../../views/pages', '').replace('.vue', '');
          const item = {
            path: path,
            component: object[key],
            meta: {
              auth: false,
            },
          };
          t.push({
            path: path.split('/'),
            comp: object[key],
          });
          router.addRoute(item);
          routes.push(item);
        }
      }
      ddddd(t);
      await sleep(1);
      this.routes = routes;
      asyncRoutes.forEach((e) => {
        router.addRoute(e);
      });
    },
  },
});

let id = 1;
function ddddd(list: dddd[]) {
  const obj: { fullPath: string; element: string; id: number; parentId: number }[] = [];
  function loop(list: dddd[]) {
    list.forEach((e) => {
      const array = e.path;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element) {
          const fullPath = e.path.filter((e, i) => i <= index).join('/');
          if (!obj.find((e) => e.fullPath == fullPath)) {
            const pid = e.path.filter((e, i) => i <= index - 1).join('/');
            obj.push({
              fullPath,
              element,
              id: id++,
              parentId: obj.find((e) => e.fullPath == pid)?.id || 0,
            });
          }
        }
      }
    });
  }
  loop(list);
  console.log(handleTree(obj));
}

export function handleTree<T>(
  data: T[],
  option?: Partial<{
    id: string;
    parentId: string;
    children: string;
  }>,
): TreeList<T> {
  const config = {
    id: option?.id || 'id',
    parentId: option?.parentId || 'parentId',
    childrenList: option?.children || 'children',
  };

  const childrenListMap = {};
  const nodeIds = {};
  const tree = [];

  for (const d of data) {
    const parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (const d of data) {
    const parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o: T) {
    if (childrenListMap[o[config.id]]) {
      const key = config.childrenList;
      o[key] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree as TreeList<T>;
}
