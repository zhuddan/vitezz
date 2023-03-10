import '@/style/index.scss';
import '@zdzz/components/dist/style.css';

import router, { setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/setupRouterGuard';
import { setupStore } from '@/store';
import ZdComponents from '@zdzz/components';
import App from './App.vue';
import { registerPlugins } from './plugins';
import { initStore } from './store/initStore';
import 'virtual:svg-icons-register';

function __init__() {
  const app = createApp(App);

  app.use(ZdComponents);
  // 注册 store
  setupStore(app);
  // 初始化 store
  initStore();
  // 注册路由
  setupRouter(app);
  // 路由拦截
  setupRouterGuard(router);
  // 插件
  registerPlugins(app);

  app.mount('#app');
}

__init__();
