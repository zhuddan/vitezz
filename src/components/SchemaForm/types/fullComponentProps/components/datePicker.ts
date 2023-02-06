import type { IconType } from '../../common';
import type { AssembleComponent } from '../../util';
// 类型
export interface DatePickerProps {

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
  // 显示类型
  type: 'year' | 'month' | 'date' | 'dates' | 'datetime' | ' week' | 'datetimerange' | 'daterange' | 'monthrange';
  // 显示在输入框中的格式
  format: string;
  // DatePicker 下拉框的类名
  popperClass: string;
  // 选择范围时的分隔符
  rangeSeparator: string;
  // 可选，选择器打开时默认显示的时间
  defaultValue: Arrayable< Date | number>;
  // 范围选择时选中日期所使用的当日内具体时刻
  defaultTime: Arrayable< Date | number>;
  // 可选，绑定值的格式。 不指定则绑定值为 Date 对象
  valueFormat: string;
  // 等价于原生 id 属性
  id: Arrayable<string>;
  // 原生属性
  name: string;
  // 在范围选择器里取消两个日期面板之间的联动
  unlinkPanels: string;
  // 自定义前缀图标
  prefixIcon: IconType;
  // 自定义清除图标
  clearIcon: IconType;
  // 输入时是否触发表单的校验
  validateEvent: boolean;
  // 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。
  disabledDate(d: Date): boolean;
  // 设置快捷选项，需要传入数组对象 Array<{ text: string, value: Date | Function }>
  shortcuts: Array<{ text: string; value: Date | Function }>;
  //	设置自定义类名
  cellClassName(d: Date): void | any;
  // 是否将 date-picker 的下拉列表插入至 body 元素
  teleported: boolean;

  // datetime-picker 通过设置type属性为datetime 即可在同一个选择器里同时进行日期和时间的选择。 快捷方式的使用方法与 Date Picker 相同。
  // 是否使用箭头按钮选择时间
  timeArrowControl: boolean;
}

export interface DatePickerEvent {
  onChange: Fn;
  onBlur: Fn;
  onFocus: Fn;
  // 	如果用户没有选择日期，那默认展示当前日的月份。 你可以使用 default-value 来设置成其他的日期。
  onCalendarChange: Fn;
  // 当日期面板改变时触发。
  onPanelChange: Fn;
  // 	当 DatePicker 的下拉列表出现/消失时触发
  onVisibleChange: Fn;
}

export type DatePicker<T extends object> = AssembleComponent<'DatePicker', DatePickerProps, DatePickerEvent, T>;