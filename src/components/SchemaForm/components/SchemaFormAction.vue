<script lang="ts" setup>
import { ElButton, ElCol, ElFormItem, useAttrs } from 'element-plus';
import { schemaFormContextKey } from '../token';

import type { FormActionButton } from '../types';

const emit = defineEmits(['action']);

const formContext = inject(schemaFormContextKey);

const colBindValue = computed(() => {
  return formContext?.colProps;
});

const attrs = useAttrs();

const getBindValue = computed(() => {
  return {
    ...attrs,
  };
});
function getBtnBindValue(btn: MaybeRecordRef<FormActionButton>) {
  const bindValue = {};
  [
    'icon',
    'type',
    'size',
    'loading',
    'plain',
    'round',
    'circle',
    'disabled',
    'autofocus',
  ].forEach((e) => {
    bindValue[e] = unref(btn[e]);
  });

  return {
    bindValue,
    text: btn.text,
    action: btn.action,
  };
}
const buttons = computed(() => {
  return unref(formContext?.actions)?.map(e => getBtnBindValue(e)) || [];
});
</script>

<template>
  <component
    :is="formContext?.inline ? 'div' : ElCol"
    v-bind="formContext?.inline ? {} : colBindValue"
    :class="{ 'display-inline-block': formContext?.inline }"
  >
    <ElFormItem v-bind="getBindValue" label="">
      <ElButton
        v-for="(btn, index) in buttons"
        :key="index"
        v-bind="btn.bindValue"
        @click="emit('action', btn.action)"
      >
        {{ btn.text }}
      </ElButton>
    </ElFormItem>
  </component>
</template>
