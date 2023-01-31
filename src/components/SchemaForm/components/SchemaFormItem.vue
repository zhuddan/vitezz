<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { ElCol, ElFormItem } from 'element-plus';

import { isString } from '@/utils/is';

import { componentMap } from '../componentMap';
import type { FormProps, FormSchema } from '../types';
const props = defineProps<{
  schema: FormSchema;
  formProps: Partial<FormProps<any>>;
  formModel: Object;
}>();

const emits = defineEmits(['update:formModel']);

const slots = useSlots();

const model = useVModel(props, 'formModel', emits);
const attrs = useAttrs();

const getValues = computed(() => {
  const { formProps, formModel, schema } = props;
  return {
    schema,
    model: formModel,
    field: schema.field,
    formProps,
  };
});

// 刷新
const slotComp = computed(() => {
  const key = props.schema?.slot;
  if (key && (slots[key] as Function))
    return () => (slots[key] as any)(getValues.value);
  else
    return null;
});

function renderComponent() {
  if (props.schema.render)
    return props.schema.render;

  if (slotComp.value && slotComp.value != null)
    return slotComp.value;

  if (props.schema.component)
    return componentMap.get(props.schema.component);

  return 'null';
}
const getBindValue = computed(() => {
  const value: Recordable = {
    ...attrs,
    rules: props.schema.rules,
    model,
    prop: props.schema.field,
  };
  if (isString(props.schema.label))
    value.label = props.schema.label;

  return value;
});
const compAttr = computed(() => {
  return {
    formProps: props.formProps,
    ...(props.schema.componentProps || {}),
  };
});
const labelIsVNode = computed(() => !isString(props.schema.label));
const LabelComp = computed(() => {
  if (labelIsVNode.value) {
    if (typeof props.schema.label == 'string')
      return () => h(props.schema.label);
    else
      return null;
  }
});

const colBindValue = computed(() => {
  if (props.schema.colProps)
    return props.schema.colProps;
  else
    return props.formProps.colProps;
});
const style = computed(() => {
  if (props.formProps.inline) {
    return {};
  }
  else {
    return {
      width: '100%',
    };
  }
});
</script>

<template>
  <component
    v-bind="colBindValue"
    :is="props.formProps.inline ? 'div' : ElCol"
    :class="{ inline_col: props.formProps.inline }"
  >
    <ElFormItem v-bind="getBindValue">
      <template v-if="labelIsVNode" #label>
        <LabelComp />
      </template>
      <slot
        v-if="props.schema.slot && $slots[props.schema.slot]"
        :model="model[props.schema.field]"
        :name="props.schema.slot"
      ></slot>
      <component
        v-bind="compAttr"
        :is="renderComponent()"
        v-else
        v-model="model[props.schema.field]"
        :style="style"
      />
    </ElFormItem>
  </component>
</template>
