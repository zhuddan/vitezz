import { cloneDeep } from 'lodash-es';
import type { Ref } from 'vue';
import { nextTick, unref } from 'vue';

import type { FormAction, FormProps } from '../types';

export interface UseFormActionContext {
  emit(t: string): void;
  props: Recordable;
  formElRef: Ref<FormAction>;
  propsRef: Ref<Partial<FormProps<any>>>;
}

export function useFormEvents({ formElRef, props, propsRef }: UseFormActionContext): FormAction {
  async function resetFields() {
    await unref(formElRef).resetFields();
    nextTick(() => clearValidate());
  }

  async function clearValidate(name?: string | string[]) {
    await unref(formElRef).clearValidate(name);
  }

  async function validate(callback?: (valid: any) => void) {
    return await unref(formElRef).validate(callback);
  }

  async function validateField(prop: string | string[], callback: (err: string) => void) {
    return await unref(formElRef).validateField(prop, callback);
  }

  async function scrollToField(prop2: string) {
    return await unref(formElRef).scrollToField(prop2);
  }
  function setProps(newFormProps: Partial<MaybeRecordRef<FormProps<any>>>) {
    const defaultFormProps = cloneDeep(props) as unknown as FormProps<any>;
    (propsRef.value as FormProps<any>) = {
      ...defaultFormProps,
      ...propsRef.value,
      ...toRaw(newFormProps),
    } as FormProps<any>;
  }

  return { setProps, resetFields, clearValidate, validate, validateField, scrollToField };
}
