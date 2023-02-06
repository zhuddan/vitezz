import type { ColEx, FormActionButton, FormSchema, LabelPositionType, RolEx, SizeType } from './types';
export const formProps = {
  schemas: {
    type: Array as PropType<FormSchema<Recordable>[]>,
    default: () => [],
  },
  model: {
    type: Object as PropType<Recordable>,
    default: () => ({}),
  },
  rules: {
    type: Object as PropType<FormRules>,
    default: () => ({}),
  },
  actionButtons: {
    type: Array as PropType<FormActionButton[]>,
    default: () => [
      {
        type: 'primary',
        action: 'submit',
        label: '提交',
      },
    ],
  },
  actionButtonsColProps: {
    type: Object as PropType<Partial<ColEx>>,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  labelPosition: {
    type: String as PropType<LabelPositionType>,
    default: 'right',
  },
  labelWidth: {
    type: [String, Number],
  },
  labelSuffix: {
    type: String,
    default: '',
  },
  hideRequiredAsterisk: {
    type: Boolean,
    default: false,
  },
  showMessage: {
    type: Boolean,
    default: true,
  },
  inlineMessage: {
    type: Boolean,
    default: false,
  },
  statusIcon: {
    type: Boolean,
    default: false,
  },
  validateOnRuleChange: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String as PropType<SizeType>,
    default: 'default',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  colProps: {
    type: Object as PropType<Partial<ColEx>>,
  },
  rolProps: {
    type: Object as PropType<Partial<RolEx>>,
    default: () => ({
      gutter: 10,
    }),
  },
};
