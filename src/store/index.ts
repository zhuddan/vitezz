import { createPinia } from 'pinia';
import type { App } from 'vue';

export const store = createPinia();

export function registerStore(app: App) {
  app.use(store);
  return app;
}
