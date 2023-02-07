import type { ColEx, FormActionButton, FormSchema, LabelPositionType, RolEx, SizeType } from './types';
import { ElIcon } from 'element-plus';
import { Check, RefreshLeft } from '@element-plus/icons-vue';
export const formProps = {
  colProps: {
    type: Object as PropType<Partial<ColEx>>,
  },
  rolProps: {
    type: Object as PropType<Partial<RolEx>>,
    default: () => ({
      gutter: 10,
    }),
  },
  model: {
    type: Object as PropType<Recordable>,
    default: () => ({}),
  },
  schemas: {
    type: Array as PropType<FormSchema<Recordable>[]>,
    default: () => [],
  },
  rules: {
    type: Object as PropType<FormRules>,
    default: () => ({}),
  },
  // 是否显示操作栏
  showActionBar: {
    type: Boolean,
    default: true,
  },
  // 操作栏 col props
  ActionBarColProps: {
    type: Object as PropType<Partial<ColEx>>,
  },
  // 是否显示提交按钮
  showSubmitButton: {
    type: Boolean,
    default: true,
  },
  // 是否显示重置按钮
  showResetButton: {
    type: Boolean,
    default: true,
  },
  //
  submitButtonOptions: {
    type: Object as PropType<FormActionButton>,
    default: () => ({
      type: 'primary',
      actionType: 'submit',
      label: '提交',
      icon: h(ElIcon, () => h(Check)),
    }),
  },
  //
  resetButtonOptions: {
    type: Object as PropType<FormActionButton>,
    default: () => ({
      actionType: 'reset',
      label: '重置',
      icon: h(ElIcon, () => h(RefreshLeft)),
    }),
  },
  // element 原生
  scrollToError: {
    type: Boolean,
    default: false,
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
};
