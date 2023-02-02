<script lang="ts" setup>
import { ElRadio, ElRadioButton, ElRadioGroup, useAttrs } from 'element-plus';

import type { FormProps } from '../types';
import type { Options, RadioType } from '../types/componentProps';

const props = defineProps({
  options: {
    type: Array as PropType<Options[]>,
    default: () => [],
  },
  compType: {
    type: String as PropType<RadioType>,
    default: 'Radio',
  },
});
const comp = computed(() => (props.compType === 'Radio' ? ElRadio : ElRadioButton));
const attrs = useAttrs();
const getBindValue = computed(() => {
  return {
    ...props,
    ...attrs,
  };
});
</script>

<template>
  <ElRadioGroup v-bind="getBindValue">
    <template v-for="item in options" :key="item.value">
      <component :is="comp" :label="item.value">
        {{ item.label }}
      </component>
    </template>
  </ElRadioGroup>
</template>
