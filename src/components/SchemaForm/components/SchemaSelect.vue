<script lang="ts" setup>
import type { SelectOption } from '../types/fullComponentProps/components/select';
import { ElOption, ElSelect } from 'element-plus';
const props = defineProps({
  options: {
    type: Array as PropType<SelectOption[]>,
    default: () => [],
  },
});
const attrs = useAttrs();

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
