import type { AssembleComponent, IconType } from '../../util';

// 类型
export interface TimePickerProps {

  // 原生  readonly 属性，是否只读
  readonly: boolean;
  // 文本框可输入
  editable: boolean;
  //  是否显示清除按钮
  clearable: boolean;
  // 输入框占位文本
  placeholder: string;
  // 范围选择时开始日期的占位内容
  startPlaceholder: string;
  // 范围选择时结束日期的占位内容
  endPlaceholder: string;

  // 是否为时间范围选择
  isRange: boolean;
  // 是否使用箭头进行时间选择
  arrowControl: boolean;
  // TimePicker 下拉框的类名
  popperClass: string;
  // 选择范围时的分隔符
  rangeSeparator: string;
  // 显示在输入框中的格式
  format: string;
  // 可选，选择器打开时默认显示的时间
  defaultValue: Arrayable< Date | number>;
  // 等价于原生 id 属性
  id: Arrayable<string>;
  // 原生属性
  name: string;
  // 自定义前缀图标
  prefixIcon: IconType;
  // 自定义清除图标
  clearIcon: IconType;
  // 禁止选择部分小时选项
  disabledHours: Fn;
  // 禁止选择部分分钟选项
  disabledMinutes: Fn;
  // 禁止选择部分秒选项
  disabledSeconds: Fn;
  // 显示类型
  // 是否将 下拉列表插入至 body 元素
  teleported: boolean;

}

export interface TimePickerEvent {
  onChange: Fn;
  onBlur: Fn;
  onFocus: Fn;
  // 	当 TimePicker 的下拉列表出现/消失时触发
  onVisibleChange: Fn;
}

export type TimePicker = AssembleComponent<'TimePicker', TimePickerProps, TimePickerEvent>;