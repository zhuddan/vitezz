<script lang="ts" setup>
import { ElCheckbox, ElCheckboxButton, ElCheckboxGroup } from 'element-plus';
import type { FormProps } from '../types';
import type { CheckboxType, Options } from '../types/componentProps';

const props = defineProps({
  options: {
    type: Array as PropType<Options[]>,
    default: () => [],
  },
  compType: {
    type: String as PropType<CheckboxType>,
    default: 'Checkbox',
  },
  formProps: {
    type: Object as PropType<FormProps<any>>,
    default: () => ({}),
  },
});
const comp = computed(() => (props.compType === 'CheckboxButton' ? ElCheckboxButton : ElCheckbox));
const attrs = useAttrs();
const getBindValue = computed(() => {
  return {
    ...props,
    ...attrs,
  };
});
</script>

<template>
  <ElCheckboxGroup v-bind="getBindValue">
    <template v-for="item in options" :key="item.value">
      <component :is="comp" :label="item.value">
        {{ item.label }}
      </component>
    </template>
  </ElCheckboxGroup>
</template>
