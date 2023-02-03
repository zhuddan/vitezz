import type { AssembleComponent } from './common';

// 类型
export interface InputNumberProps {
  // 原生属性，
  max: number;
  // 原生属性
  min: number;
  // 原生属性，设置输入字段的合法数字间隔
  step: number;
  // 是否只能输入 step 的倍数
  stepStrictly: boolean;
  // 数值精度
  precision: number;
  // 原生  readonly 属性，是否只读
  readonly: boolean;
  // // 是否禁用
  // disabled: boolean;
  // 是否使用控制按钮
  controls: Boolean;
  // 控制按钮位置
  controlsPosition: 'right' | 'left';
  // 原生属性
  name: string;
  // 输入框关联的 label 文字
  label: string;
  // 输入框占位文本
  placeholder: string;
  // 当输入框被清空时显示的值
  valueOnClear: string | number | null;
  // 输入时是否触发表单的校验
  validateEvent: boolean;
}
// CSSProperties
export interface InputNumberEvent {
  onChange: Fn;
  onBlur: Fn;
  onFocus: Fn;
}

export type InputNumber = AssembleComponent<'InputNumber', InputNumberProps, InputNumberEvent>;