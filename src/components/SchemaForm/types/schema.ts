import type { FullComponentProps } from './fullComponentProps';
import type { VNode } from 'vue';
import type { ColEx } from './layout';

interface BaseFormSchema <T = any> {
  // 字段属性名
  field: T extends object ? keyof T : string ;
  // 标签上显示的自定义内容
  label: string | VNode;
  // 子组件
  render?: VNode;
  // 自定义
  slot?: string;
  //
  colProps?: Partial<ColEx>;
  //
  rules?: Arrayable<FormItemRule>;
}

export type FormSchema<T extends object> = MaybeRecordRef<BaseFormSchema<T>> & FullComponentProps<T>;