import { createApp } from 'vue';
import App from './App.vue';
import { store } from '@/store';
import router from '@/router';

createApp(App).use(store).use(router).mount('#app');

import { useCache } from './hooks/web/useCache';

const webCache = useCache();
webCache.set('token', 'data');
