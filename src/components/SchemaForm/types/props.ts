import type { FormActionButton } from './button';
import type { ColEx, RolEx } from './layout';
import type { FormSchema } from './schema';
import type { LabelPositionType, SizeType } from './common';

export interface FormProps<T extends object> {
  scrollToError: Boolean;
  // 表单操作
  actions: MaybeRecordRef<FormActionButton>[];
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
