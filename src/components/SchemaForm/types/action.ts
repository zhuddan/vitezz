import type { FormProps } from './props';
export interface FormAction {
  // 设置表单属性
  setProps: (props: Partial<MaybeRecordRef<FormProps<any>>>) => void;
  // 对整个表单作验证
  validate: (callback?: (isValid: boolean) => void) => Promise<void>;
  // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
  resetFields: () => void;
  // 清理指定字段的表单验证信息
  clearValidate: (props?: string | string[]) => void;
  // 对部分表单字段进行校验的方法
  validateField: (props: string | string[], callback: (err: string) => void) => void;
  // 滚动到指定表单字段
  scrollToField: (prop: string) => void;
  // 提交
  submit: () => Promise<void>;
}