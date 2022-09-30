import '@animxyz/core';

import VueAnimXyz from '@animxyz/vue3';
import type { App } from 'vue';

import Icon from '@/components/Icon';
const globComp = [Icon];

export function registerGlobComp(app: App) {
  app.use(VueAnimXyz);
  for (let index = 0; index < globComp.length; index++) {
    const element = globComp[index];
    app.component(element.name, element);
  }
}
