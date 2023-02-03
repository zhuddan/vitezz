<script lang="ts" setup>
import { ElCheckbox, ElCheckboxButton, ElCheckboxGroup } from 'element-plus';
import type { CheckboxGroupComponentType, CheckboxGroupOption } from '../types/components/checkbox';

const props = defineProps({
  options: {
    type: Array as PropType<CheckboxGroupOption[]>,
    default: () => [],
  },
  componentType: {
    type: String as PropType<CheckboxGroupComponentType>,
    default: 'Checkbox',
  },
});

const componentType = computed(() => (props.componentType === 'CheckboxButton' ? ElCheckboxButton : ElCheckbox));
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
      <!-- <component :is="comp" :label="item.value">
        {{ item.label }}
      </component> -->

      <component
        :is="componentType"
        :label="item.value"
        v-bind="item.optionProps"
      >
        {{ item.label }}
      </component>
    </template>
  </ElCheckboxGroup>
</template>
