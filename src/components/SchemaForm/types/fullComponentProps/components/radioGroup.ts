import type { AssembleComponent, SizeType, WithOption } from '../../util';

export type RadioComponentType = 'Radio' | 'RadioButton';

interface RadioProps {
  disabled: boolean;
  border: boolean;
  size: SizeType;
  name: string;
}

export type RadioGroupOption = WithOption<RadioProps>;

interface RadioGroupProps {
// 按钮形式的 Radio 激活时的文本颜色
  textColor: string;
  // 按钮形式的 Radio 激活时的填充色和边框色
  fill: string;
  // 输入时是否触发表单的校验
  validateEvent: boolean;
  // 组件类型
  componentType: RadioComponentType;
  // 选项
  options: RadioGroupOption[];
}

interface RadioGroupEvent {
  onChange: Fn;
}

export type RadioGroup = AssembleComponent<'RadioGroup', RadioGroupProps, RadioGroupEvent>;
