import type { RouteRecordRaw } from 'vue-router';

declare global {
  interface ExtendRouteRecordRaw {
    meta: {
      title?: string;
      auth?: boolean;
      hidden?: boolean;
    };
  }
  type _VueRouteRecordRaw = RouteRecordRaw & ExtendRouteRecordRaw;
  declare type VueRouteRecordRaw = TreeItem<_VueRouteRecordRaw>;
  declare type s = Pick<RouteRecordRaw, 'meta'>;
}
