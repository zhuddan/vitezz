<script lang="ts" setup>
import { ElButton, ElCol, ElFormItem, useAttrs } from 'element-plus';

import type { ActionsType, FormProps } from '../types';

const props = defineProps<{
  formProps: Partial<FormProps<any>>;
}>();
const emit = defineEmits(['action']);
const colBindValue = computed(() => {
  return props.formProps.colProps;
});

const attrs = useAttrs();

const getBindValue = computed(() => {
  return {
    ...attrs,
    ...props,
    prop: '',
  };
});
function getBtnBindValue(btn: ActionsType) {
  const bindValue = {};
  const ps = [
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
    bindValue[e] = btn[e];
  });

  return {
    bindValue,
    text: btn.text,
    action: btn.action,
  };
}
const buttons = computed(() => {
  return unref(getBindValue.value.formProps.actions)?.map(e => getBtnBindValue(e)) || [];
});
</script>

<template>
  <component
    v-bind="colBindValue"
    :is="props.formProps.inline ? 'div' : ElCol"
    v-if="buttons && buttons.length"
    :class="{ inline_col: props.formProps.inline }"
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
