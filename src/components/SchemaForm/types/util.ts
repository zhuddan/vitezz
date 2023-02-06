import type { CSSProperties, Ref, VNode } from 'vue';
import type { FormAction } from '.';

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

export interface A1<CN extends ComponentType, CP extends object, E extends object = object> {
  component: Ref<CN>;
  componentProps?: MaybeRecordRef<Partial<CP & E & CommonProps>>;
}

export interface A2<CN extends ComponentType, CP extends object, E extends object = object> {
  component: CN;
  componentProps?: MaybeRecordRef<Partial<CP & E & CommonProps>>;
}

// export type AssembleComponent<CN extends ComponentType, CP extends object, E extends object = object> = A1<CN, CP, E> | A2<CN, CP, E>;
export interface AssembleComponent<CN extends ComponentType, CP extends object, EV extends object, D extends object = any> {
  component: CN;
  componentProps?: MaybeRecordRef<Partial<CP & EV & CommonProps>> | ((formModel: D, formAction: FormAction) => MaybeRecordRef<Partial<CP & EV & CommonProps>>)
  ;
}