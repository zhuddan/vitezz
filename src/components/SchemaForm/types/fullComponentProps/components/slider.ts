import type { AssembleComponent, SizeType } from '../../util';

// 类型
export interface SliderProps {
  // 原生属性，
  max: number;
  // 原生属性
  min: number;
  // 原生属性，设置输入字段的合法数字间隔
  step: number;
  // 是否显示输入框，仅在非范围选择时有效
  showInput: boolean;
  // 在显示输入框的情况下，是否显示输入框的控制按钮
  showInputControls: boolean;
  // 输入框的大小，如果设置了 size 属性，默认值自动取 size
  inputSize: SizeType;
  // 是否显示间断点
  showStops: boolean;
  // 是否显示提示信息
  showTooltip: boolean;
  // 格式化提示信息
  format(v: string | number): any;
  // 是否开启选择范围
  range: boolean;
  // 垂直模式
  vertical: boolean;
  // 滑块高度，垂直模式必填
  height: string;
  //	屏幕阅读器标签
  label: string;
  // 当 range 为true时，屏幕阅读器标签开始的标记
  rangeStartLabel: string;
  // 当 range 为true时，屏幕阅读器标签结尾的标记
  rangeEndLabel: string;
  // 显示屏幕阅读器的 aria-valuenow 属性的格式
  formatValueText(v: string | number): any;
  // 输入时的去抖延迟，毫秒，仅在 show-input 等于 true 时有效
  debounce: number;
  // tooltip 的自定义类名
  tooltipClass: string;
  // Tooltip 出现的位置
  placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
  // 标记， key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标记可以单独设置样式
  marks: object;
  // 输入时是否触发表单的校验
  validateEvent: boolean;
}

export interface SliderEvent {
  onChange: Fn;
  onInput: Fn;
}

export type Slider = AssembleComponent<'Slider', SliderProps, SliderEvent>;