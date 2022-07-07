import { createPinia } from 'pinia';
import type { App } from 'vue';

function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' };
}

export const store = createPinia();
store.use(SecretPiniaPlugin);

export function registerStore(app: App) {
  app.use(store);
  return app;
}
