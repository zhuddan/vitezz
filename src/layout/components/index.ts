import { withInstall } from '@/utils';

import layoutFooter from './src/LayoutFooter/index.vue';
import layoutHeader from './src/LayoutHeader/index.vue';
import layoutMain from './src/LayoutMain/index.vue';
import layoutSlider from './src/LayoutSlider/index.vue';

export const LayoutFooter = withInstall(layoutFooter);
export const LayoutHeader = withInstall(layoutHeader);
export const LayoutMain = withInstall(layoutMain);
export const LayoutSlider = withInstall(layoutSlider);
