import { createApp } from 'vue';
import App from './App.vue';
import { store } from '@/store';
import router from '@/router';
import Icon from '@/components/Icon';

const app = createApp(App).use(store).use(router);
app.component('Icon', Icon);
app.mount('#app');
`

ni stylelint  stylelint-config-prettier  stylelint-config-recommended  stylelint-config-recommended-vue  stylelint-config-standard  stylelint-order postcss  postcss-html  postcss-scss -D

`;
