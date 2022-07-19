import { createApp } from 'vue';
import App from './App.vue';
import { store } from '@/store';
import router from '@/router';
import Icon from '@/components/Icon';

const app = createApp(App).use(store).use(router);
app.component('Icon', Icon);
app.mount('#app');
