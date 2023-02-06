import type { AssembleComponent, StyleType } from '../../util';

// 类型
export interface InputProps {
  // 类型
  type: string;
  // 最大输入长度
  maxlength: number | string;
  // 	原生属性，最小输入长度
  minlength: number;
  // 是否显示输入字数统计
  showWordLimit: boolean;
  // 输入框占位文本
  placeholder: string;
  // 是否可清空
  clearable: boolean;
  // 是否显示切换密码图标
  showPassword: boolean;
  // 自定义前缀图标
  prefixIcon: any;
  // 自定义后缀图标
  suffixIcon: any;
  // 	输入框行数，只对 type="textarea" 有效
  rows: number;
  // textarea高度是否自适应，只在 type="textarea" 时生效。
  autosize: number | { minRows?: number; maxRows?: number };
  // 原生属性，自动补全
  autocomplete: boolean;
  // 原生属性
  name: string;
  //  原生属性，是否只读
  readonly: boolean;
  // 原生属性，
  max: number;
  // 原生属性
  min: number;
  // 原生属性，
  step: number;
  // 控制是否能被用户缩放
  resize: 'none' | 'both' | 'horizontal' | 'vertical';
  // 原生属性，
  autofocus: boolean;
  // 原生属性
  form: string;
  // 输入框关联的 label 文字
  label: string;
  // 输入框的 tabindex
  tabindex: string | number;
  // 输入时是否触发表单的校验
  validateEvent: boolean;
  // input 元素或 textarea 元素的 style	object
  inputStyle: StyleType;
  // 指定输入值的格式。(只有当 type 是"text"时才能工作)
  formatter: (value: string | number) => string;
  // 指定从格式化器输入中提取的值。(仅当 type 是"text"时才起作用)
  parser: (value: string) => string;
}

export interface InputEvent {
  // onBlur: Fn;
  // onFocus: Fn;
  // onChange: Fn;
  onInput: Fn;
  // onClear: Fn;
}

export type Input<T extends object> = AssembleComponent<'Input', InputProps, InputEvent, T>;