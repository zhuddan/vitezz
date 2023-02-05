import type { CSSProperties, VNode } from 'vue';

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

export type LabelPositionType = 'left' | 'right' | 'top';

export type SizeType = 'large' | 'default' | 'small';

export type Effect = 'dark' | 'light';

export type StyleType = Arrayable<CSSProperties | string>;

export type IconType = string | VNode;

export interface CommonProps {
  disabled: boolean;
  style: StyleType;
  size: SizeType;
}

export interface WithOption<OptionsProps extends object = object> {
  value: any;
  label: string | number;
  disabled?: boolean;
  optionProps?: Partial<OptionsProps>;
}

export interface AssembleComponent<CN extends ComponentType, CP extends object, E extends object = object> {
  component: MaybeRef<CN>;
  componentProps?: MaybeRef<MaybeRefRecordWrap<Partial<CP & E & CommonProps>>>;
}