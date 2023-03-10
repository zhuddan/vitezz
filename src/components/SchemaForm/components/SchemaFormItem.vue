<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { ElCol, ElDivider, ElFormItem } from 'element-plus';

import { isFunction, isString } from '@zdzz/shared';

import { componentMap } from '../componentMap';
import type { FormSchema } from '../types';
import { schemaFormContextKey } from '../token';

const props = defineProps<{
  schema: FormSchema<any>;
  formModel: Object;
}>();

const emits = defineEmits(['update:formModel']);

const formContext = inject(schemaFormContextKey);

const slots = useSlots();
const model = useVModel(props, 'formModel', emits);
const attrs = useAttrs();

const getValues = computed(() => {
  const { formModel, schema } = toRefs(props);
  return {
    schema,
    model: formModel,
    field: unref(schema).field,
  };
});

const slotKey = computed(() => unref(props.schema?.slot));

const fieldKey = computed(() => unref(props.schema.field));
// 刷新
const slotComp = computed(() => {
  const key = unref(slotKey);
  if (key && (slots[key] as Function))
    return () => (slots[key] as any)(getValues.value);
  else
    return null;
});

const getBindValue = computed(() => {
  const value: Recordable = {
    ...attrs,
    rules: props.schema.rules,
    // model,
    prop: props.schema.field,
  };
  if (isString(props.schema.label))
    value.label = props.schema.label;

  return value;
});

function renderComponent() {
  if (props.schema.render)
    return props.schema.render;

  if (slotComp.value && slotComp.value != null)
    return slotComp.value;

  if (props.schema.component == 'Divider') {
    return () => h(
      ElDivider,
      {
        ... {
          contentPosition: 'left',
          ...unref(getBindValue),
        },
      },
      () => unref(props.schema.label),
    );
  }
  return componentMap.get(unref(props.schema.component));
}

const compAttr = computed(() => {
  const componentProps = props.schema.componentProps || {};
  if (isFunction(componentProps))
    return componentProps(toRaw(unref(model)), formContext as any);
  return {
    ...(props.schema.componentProps || {}),
  };
});
const labelIsVNode = computed(() => !isString(unref(props.schema.label)));
const isDivider = computed(() => unref(props.schema.component) == 'Divider');
const LabelComp = computed(() => {
  if (labelIsVNode.value) {
    if (typeof props.schema.label == 'string' && !isDivider.value)
      return () => h(props.schema.label);
    else
      return null;
  }
});

const colBindValue = computed(() => {
  if (props.schema.colProps)
    return props.schema.colProps;
  if (formContext?.colProps)
    return formContext?.colProps;
  return undefined;
});
const style = computed(() => formContext?.inline ? undefined : { width: '100%' });
</script>

<template>
  <component
    :is="formContext?.inline ? 'div' : ElCol"
    v-bind="formContext?.inline ? {} : colBindValue"
    :class="{ 'display-inline-block': formContext?.inline }"
  >
    <ElFormItem
      v-bind="{
        ...getBindValue,
        label: isDivider ? undefined : getBindValue.label,
      }"
    >
      <template v-if="labelIsVNode" #label>
        <LabelComp />
      </template>
      <slot
        v-if="slotKey && $slots[slotKey]"
        :model="model[fieldKey]"
        :name="slotKey"
      ></slot>
      <component
        v-bind="{
          ...compAttr,
        }"
        :is="renderComponent()"
        v-else
        v-model="model[fieldKey]"
        :style="style"
      />
    </ElFormItem>
  </component>
</template>
