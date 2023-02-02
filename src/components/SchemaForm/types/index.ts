import type { VNode } from 'vue';

import type { ComponentProps } from './componentProps';
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
  | 'Divider';

type ColSpanType = number;
export type LabelPositionType = 'left' | 'right' | 'top';
export type SizeType = 'large' | 'default' | 'small';

export interface RolEx {
  // 栅格间隔
  gutter?: number;
  // flex 布局下的水平排列方式
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
  // flex 布局下的垂直排列方式
  align?: 'top' | 'middle' | 'bottom';
  // 自定义元素标签
  tag?: string;
}

export interface ColEx {
  span?: ColSpanType;

  offset?: ColSpanType;
  // 栅格向右移动格数
  push?: ColSpanType;
  // 	栅格向左移动格数
  pull?: ColSpanType;

  xs?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  sm?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  md?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  lg?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  xl?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  xxl?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  tag?: string;
}

export interface FormSchema<T = any> {
  // 字段属性名
  field: T extends object ? keyof T : string;
  // 标签上显示的自定义内容
  label: string | VNode;
  // 组件
  component: ComponentType;
  // 子组件 属性
  componentProps?: ComponentProps;

  // 子组件
  render?: VNode;
  // 自定义
  slot?: string;
  //
  colProps?: Partial<ColEx>;
  //
  rules?: MaybeRef<Arrayable<FormItemRule>>;
}

export interface FormProps<T extends object> {
  useScrollToErrorField: Boolean;
  // 表单操作
  actions: FormActionButton[];
  // 表单数据对象
  model?: Partial<T>;
  // 字段 schemas
  schemas: FormSchema<T>[];
  // 表单验证规则
  rules?: FormRules<T>;
  // 行内表单模式
  inline?: boolean;
  // 表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性
  labelPosition?: LabelPositionType;
  // 标签的长度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto。
  labelWidth?: string | number;
  // 表单域标签的后缀	string	—
  labelSuffix?: string;
  // 是否显示必填字段的标签旁边的红色星号	boolean	false
  hideRequiredAsterisk?: boolean;
  // 是否显示校验错误信息	boolean	true
  showMessage?: boolean;
  // 是否以行内形式展示校验信息	boolean	false
  inlineMessage?: boolean;
  // 是否在输入框中显示校验结果反馈图标	boolean	false
  statusIcon?: boolean;
  // 是否在 rules 属性改变后立即触发一次验证	boolean	true
  validateOnRuleChange?: boolean;
  // 用于控制该表单内组件的尺寸	'large' | 'default' | 'small'	—
  size?: SizeType;
  // 是否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部分已禁用 `` prop。	boolean	false
  disabled?: boolean;

  colProps?: Partial<ColEx>;

  rolProps?: Partial<RolEx>;
}

export interface FormAction {
  // 设置表单属性
  setProps: (props: Partial<MaybeRefRecordWrap<FormProps<any>>>) => void;
  // 对整个表单作验证
  validate: (callback?: (valid: any) => void) => void;
  // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
  resetFields: () => void;
  // 清理指定字段的表单验证信息
  clearValidate: (props?: string | string[]) => void;
  // 对部分表单字段进行校验的方法
  validateField: (props: string | string[], callback: (err: string) => void) => void;
  // 滚动到指定表单字段
  scrollToField: (prop: string) => void;
}

export interface FormActionButton {
  text: string;
  action: string;
  colProps?: Partial<ColEx>;

  icon?: VNode | string;
  type?: MaybeRef<'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | ''>;
  size?: MaybeRef<SizeType>;
  loading?: MaybeRef<boolean>;
  plain?: MaybeRef<boolean>;
  round?: MaybeRef<boolean>;
  circle?: MaybeRef<boolean>;
  disabled?: MaybeRef<boolean>;
  autofocus?: MaybeRef<boolean>;
}
