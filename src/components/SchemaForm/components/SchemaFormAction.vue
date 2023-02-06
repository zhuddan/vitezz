<script lang="ts" setup>
import { ElButton, ElCol, ElFormItem, useAttrs } from 'element-plus';
import { schemaFormContextKey } from '../token';
import type { FormActionButton } from '../types';
const formContext = inject(schemaFormContextKey);
const colBindValue = computed(() => formContext?.actionButtonsColProps ?? formContext?.colProps);
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
  return unref(formContext?.actionButtons)?.map(e => getBtnBindValue(e as any)) || [];
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
    await formContext?.action.validate();
}
</script>

<template>
  <div style="position: fixed;">
    {{ colBindValue }}
  </div>
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
    </ElFormItem>
  </component>
</template>
