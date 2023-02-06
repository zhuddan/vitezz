import type { CSSProperties, VNode } from 'vue';

export type Type = [];

export type LabelPositionType = 'left' | 'right' | 'top';

export type SizeType = 'large' | 'default' | 'small';

export type Effect = 'dark' | 'light';

export type StyleType = Arrayable<CSSProperties | string>;

export type IconType = string | VNode;

export type ComponentType =
  | 'Input'
  | 'InputNumber'
  | 'Select'
  | 'RadioGroup'
  | 'CheckboxGroup'
  | 'Cascader'
  | 'DatePicker'
  | 'TimePicker'
  | 'TimeSelect'
  | 'Switch'
  | 'Upload'
  | 'Slider'
  | 'Rate'
  | 'Divider'
  | 'ColorPicker';