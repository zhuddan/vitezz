import type { VNode } from 'vue';
import type { SizeType } from './common';
import type { ColEx } from './layout';
// import type { SizeType } from './util';
export interface FormActionButton {
  text: string;
  action: string;
  colProps?: Partial<ColEx>;
  icon?: VNode | string;
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | '';
  size?: SizeType;
  loading?: boolean;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  autofocus?: boolean;
}
