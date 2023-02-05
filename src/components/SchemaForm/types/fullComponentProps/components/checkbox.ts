import type { AssembleComponent, SizeType, WithOption } from '../../util';

export type CheckboxGroupComponentType = 'Checkbox' | 'CheckboxButton';

interface CheckboxGroupProps {
  // 选中时的值
  trueLabel: string | number;
  // 没有选中时的值
  falseLabel: string | number;
  // 是否禁用
  disabled: boolean;
  // 是否显示边框
  border: boolean;
  // Checkbox 的尺寸
  size: SizeType;

  // boolean
  checked: boolean;
  //	设置不确定状态，仅负责样式控制
  indeterminate: boolean;
  // 输入时是否触发表单的校验
  validateEvent: boolean;
  // string
  tabindex: string | number;
  // input id
  id: string;
  //  与 aria-control一致, 当 indeterminate为 true时生效
  controls: boolean;
}

export type CheckboxGroupOption = WithOption<CheckboxGroupProps>;

interface CheckboxGroupProps {
  // 可被勾选的 checkbox 的最小数量
  min: number;
  // 可被勾选的 checkbox 的最大数量
  max: number;
  // 按钮形式的 Radio 激活时的文本颜色
  textColor: string;
  // 按钮形式的 Radio 激活时的填充色和边框色
  fill: string;
  // 复选框组元素标签
  tag: string;
  // 输入时是否触发表单的校验
  validateEvent: boolean;
  // 组件类型
  componentType: CheckboxGroupComponentType;
  // 选项
  options: CheckboxGroupOption[];
}

interface CheckboxGroupEvent {
  onChange: Fn;
}

export type CheckboxGroup = AssembleComponent<'CheckboxGroup', CheckboxGroupProps, CheckboxGroupEvent>;
