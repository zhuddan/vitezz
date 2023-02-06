import type { InjectionKey } from 'vue';
import type { FormProps as ElFormProps } from 'element-plus';
import type { FormAction, FormProps } from './types';

type SchemaFormContent = {
  action: FormAction;
} & FormProps<any> & ElFormProps;

export const schemaFormContextKey: InjectionKey<SchemaFormContent> = Symbol('schemaFormContextKey');