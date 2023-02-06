import type { AssembleComponent, Effect, IconType } from '../../util';

// 类型
export interface TimeSelectProps {
  // 原生  readonly 属性，是否只读
  readonly: boolean;
  // 文本框可输入
  editable: boolean;
  //  是否显示清除按钮
  clearable: boolean;
  // 原生属性
  name: string;
  // 输入框占位文本
  placeholder: string;
  // Tooltip 主题，内置了 dark / light 两种主题
  effect: Effect;
  // 自定义前缀图标
  prefixIcon: IconType;
  // 自定义清除图标
  clearIcon: IconType;
  // 开始时间
  start: string;
  // 结束时间
  end: string;
  // 间隔时间
  step: string;
  // 最早时间点，早于该时间的时间段将被禁用
  minTime: string;
  // 最晚时间点，晚于该时间的时间段将被禁用
  maxTime: string;
  // 显示在输入框中的格式
  format: string;
}

export interface TimeSelectEvent {
  onChange: Fn;
  onBlur: Fn;
  onFocus: Fn;
}

export type TimeSelect<T extends object> = AssembleComponent<'TimeSelect', TimeSelectProps, TimeSelectEvent, T>;