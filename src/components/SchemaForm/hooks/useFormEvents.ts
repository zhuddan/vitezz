import { merge } from 'lodash-es';
import type { ComputedRef, Ref } from 'vue';
import { nextTick, unref } from 'vue';

import type { FormAction, FormProps } from '../types';

export interface UseFormActionContext {
  emit: EmitType;
  getBindValue: ComputedRef<Recordable<any>>;
  formElRef: Ref<FormAction>;
  propsRef: Ref<Partial<FormProps<any>>>;
}

export function useFormEvents(context: UseFormActionContext): FormAction {
  const { formElRef, propsRef, emit, getBindValue } = context;

  async function resetFields() {
    await unref(formElRef).resetFields();
    nextTick(() => clearValidate());
  }

  async function clearValidate(name?: string | string[]) {
    await unref(formElRef).clearValidate(name);
  }

  async function validate(callback?: (isValid: boolean) => void): Promise<any> {
    return unref(formElRef).validate(callback);
  }

  async function validateField(prop: string | string[], callback: (err: string) => void) {
    return await unref(formElRef).validateField(prop, callback);
  }

  async function scrollToField(prop2: string) {
    return await unref(formElRef).scrollToField(prop2);
  }

  function setProps(newFormProps: Partial<MaybeRecordRef<FormProps<any>>>) {
    console.log({ ...propsRef.value });
    console.log(toRaw({ ...newFormProps }));
    const d = merge({ ...propsRef.value }, { ...toRaw(newFormProps) }) as FormProps<any>;
    console.log(d.submitButtonOptions);
    propsRef.value = d;
  }

  //

  async function submit() {
    const _getBindValue = toRaw(unref(getBindValue));
    if (_getBindValue.submitHandler) {
      _getBindValue.submitHandler();
      return;
    }
    const isValid = await validate();
    if (isValid) {
      const values = toRaw(unref(propsRef).model);
      emit('submit', values);
    }
  }

  return {
    submit,
    setProps,
    resetFields,
    clearValidate,
    validate,
    validateField,
    scrollToField,
  };
}
