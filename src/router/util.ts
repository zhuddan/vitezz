import { capitalize } from '@/utils';
import router from '.';

export class RouteUtil {
  id = 0;

  maps: Record<string | symbol, boolean> = {};

  reset() {
    for (const key in this.maps) {
      if (Object.prototype.hasOwnProperty.call(this.maps, key)) {
        this.maps[key] = false;
      }
    }
  }

  handleRouteName(route: VueRouteRecordRaw) {
    if (route.name) {
      this.maps[route.name] = true;
      return;
    }
    let name = route.path
      .split('/')
      .filter((e) => !!e)
      .reduce((a, b) => {
        return capitalize(a, false) + capitalize(b);
      }, '');
    if (this.maps[name]) {
      name += `${this.id++}`;
    }
    this.maps[name] = true;
    route.name = name;
  }

  addRoutes(routes: VueRouteRecordRaw[], autoName = true) {
    routes.forEach((route) => {
      autoName && this.handleRouteName(route);
      this.addRoute(route);
    });
  }

  addRoute(route: VueRouteRecordRaw) {
    router.addRoute(route);
  }

  removeRoutes(routes: VueRouteRecordRaw[]) {
    routes.forEach((route) => {
      this.removeRoute(route);
    });
  }

  removeRoute(route: VueRouteRecordRaw) {
    const name = route.name;
    if (!name) {
      return;
    }
    router.removeRoute(name);
  }
}

export default new RouteUtil();
