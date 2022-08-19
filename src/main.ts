import { createApp } from 'vue';

import { registerGlobComp } from '@/components/registerGlobComp';
import router, { setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/setupRouterGuard';
import { setupStore } from '@/store';

import App from './App.vue';

function __init__() {
  const app = createApp(App);
  // 注册全局状态管理 pinia
  setupStore(app);
  // 注册路由
  setupRouter(app);
  // 注册路由拦截
  setupRouterGuard(router);
  // 注册 全局组件
  registerGlobComp(app);
  // 挂载
  app.mount('#app');
}
__init__();
