<script lang="ts" setup>
import type { FormProps } from '../types';
import type { Options } from '../types/componentProps';
import { ElOption, ElSelect } from 'element-plus';
const props = defineProps({
  options: {
    type: Array as PropType<Options[]>,
    default: () => [],
  },
  formProps: {
    type: Object as PropType<FormProps<any>>,
    default: () => ({}),
  },
});
const attrs = useAttrs();
// const { realOptions } = useDictsOptions(props);

const getBindValue = computed(() => {
  return {
    ...props,
    ...attrs,
  };
});
</script>

<template>
  <ElSelect v-bind="getBindValue">
    <template v-if="options.length">
      <ElOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </template>
    <slot></slot>
  </ElSelect>
</template>
