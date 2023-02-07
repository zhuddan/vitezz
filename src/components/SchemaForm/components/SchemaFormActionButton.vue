<script lang="ts" setup>
import { ElButton, ElCol, ElFormItem } from 'element-plus';
import { schemaFormContextKey } from '../token';
import type { FormActionButton } from '../types';
const formContext = inject(schemaFormContextKey);
const colBindValue = computed(() => formContext?.ActionBarColProps ?? formContext?.colProps);
function getBtnBindValue(btn: MaybeRecordRef<FormActionButton>) {
  const bindValue: Partial<FormActionButton> = {} ;
  for (const key in btn) {
    if (Object.prototype.hasOwnProperty.call(btn, key)) {
      const element = btn[key];
      bindValue[key] = unref(element);
    }
  }
  return bindValue;
}
const buttons = computed(() => {
  if (!formContext?.showActionBar || (!formContext?.showResetButton && !formContext?.showSubmitButton))
    return [];

  return [
    unref(formContext?.resetButtonOptions),
    unref(formContext?.submitButtonOptions),
  ]?.map(e => getBtnBindValue(e as any)) || [];
});

async function handleClick(e: Partial<FormActionButton>) {
  const onClickHandle = unref(e.onClick);
  if (onClickHandle) {
    onClickHandle({
      ...e,
      onClick: undefined,
    });
    return;
  }
  if (e.actionType == 'submit')
    formContext?.action.submit();
  if (e.actionType == 'reset')
    formContext?.action.resetFields();
}
</script>

<template>
  <component
    :is="formContext?.inline ? 'div' : ElCol"
    v-bind="formContext?.inline ? {} : colBindValue"
    :class="{ 'display-inline-block': formContext?.inline }"
  >
    <ElFormItem label="&nbsp;">
      <ElButton
        v-for="(btn, index) in buttons"
        :key="index"
        v-bind="{ ...btn, onClick: undefined }"
        @click="handleClick(btn)"
      >
        {{ btn.label }}
      </ElButton>
      <slot name="action"></slot>
    </ElFormItem>
  </component>
</template>
