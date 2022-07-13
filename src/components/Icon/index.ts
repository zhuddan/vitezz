import { withInstall } from '@/utils';
import iconPicker from './src/IconPicker.vue';
import icon from './src/Icon.vue';

const Icon = withInstall(icon);
export const IconPicker = withInstall(iconPicker);

export default Icon;
