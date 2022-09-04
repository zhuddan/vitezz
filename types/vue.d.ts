/// <reference types="vite/client" />
// declare module '*.vue' {
//   import type { DefineComponent } from 'vue';

//   const component: DefineComponent<{}, {}, any>;
//   export default component;
// }

interface ImportMetaEnv {
  // project title
  readonly VITE_APP_TITLE: string;
  // geo server
  readonly VITE_APP_GEO_SERVER_URL: string;
  // only office
  readonly VITE_APP_ONLY_OFFICE_URL: string;
  // dev serve port
  readonly VITE_APP_PORT: string;
  // ajax url
  readonly VITE_APP_BASE_API: string;
  // ajax url prefix
  readonly VITE_APP_PREFIX: string;
}
