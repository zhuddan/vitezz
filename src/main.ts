import { createApp } from 'vue';
import App from './App.vue';
import { store } from '@/store';
import router from '@/router';

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');



// import alias test 
import type { Name, Data } from '~/test';
const names: Name[] = ['张三', '李四', '王二', '王二', '麻子'];
const data: Data = {
  name:'zd',
};

console.log(names, data);
