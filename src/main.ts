import App from './App.vue';
import router, { setupRouter } from '@/router';
import { setupStore } from '@/store';

import { setupRouterGuard } from '@/router/setupRouterGuard';

import { registerGlobComp } from '@/components/registerGlobComp';

import { initStore } from './store/initStore';

function __init__() {
  const app = createApp(App);
  // 注册 store
  setupStore(app);
  // 初始化 store
  initStore();
  // 注册路由
  setupRouter(app);
  // 路由拦截
  setupRouterGuard(router);
  // 全局组件
  registerGlobComp(app);

  app.mount('#app');
}

__init__();
