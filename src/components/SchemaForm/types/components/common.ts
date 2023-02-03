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

export type SizeType = 'large' | 'default' | 'small';

export type Effect = 'dark' | 'light';

export interface CompEvents {
  onBlur: Fn;
  onFocus: Fn;
  onChange: Fn;
  onInput: Fn;
  onClear: Fn;
  onVisibleChange: Fn;
  // 多选模式下移除tag时触发
  removeRag: Fn;
  // 下拉框出现/隐藏时触发
  visibleChange: Fn;
  // 如果用户没有选择日期，那默认展示当前日的月份。 你可以使用 default-value 来设置成其他的日期。
  calendarChange: Fn;
  //    当日期面板改变时触发。	(date, mode, view)
  panelChange: Fn;
}

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