<script lang="ts" setup>
import type { Ref } from 'vue';
import type { FormAction, FormProps, FormSchema } from './types';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { ElConfigProvider, ElForm, ElRow } from 'element-plus';

import { useFormEvents } from './hooks/useFormEvents';
import { formProps } from './schemaFormProps';
import { schemaFormContextKey } from './token';

import SchemaFormActionButton from './components/SchemaFormActionButton.vue';
import SchemaFormItem from './components/SchemaFormItem.vue';
import { merge } from 'lodash-es';

const props = defineProps(formProps);
const emit = defineEmits([
  'update:model',
  'register',
  'submit',
  'reset',
  'action',
  'validateError',
]);

const attrs = useAttrs();
const formRef = ref<Nullable<FormAction>>();
const propsRef = ref<Partial<FormProps<any>>>({});
const schemaRef = ref<FormSchema<any>[]>([]);
const getBindValue = computed<Recordable>(() => ({
  ...attrs,
  ...props,
  ...propsRef.value,
}));
const getProps = computed((): FormProps<any> => {
  return { ...props, ...unref(propsRef) } as FormProps<any>;
});

const getSchema = computed(() => {
  const schemas: FormSchema<any>[] = unref(schemaRef) || (unref(getProps).schemas as any);
  return schemas;
});

const formAction = useFormEvents({
  emit: emit as EmitType,
  getBindValue,
  formElRef: formRef as Ref<FormAction>,
  propsRef,
});

function setSchema(val: MaybeRef<FormSchema<any>[]>) {
  schemaRef.value = unref(val) as any;
}

const getModel = computed(() => {
  return getBindValue.value.model;
});
//
formAction.setProps(props);

watch(
  () => unref(getProps).model,
  () => {
    const { model } = unref(getProps);
    if (!model) return;
    emit('update:model', model.value);
  },
  {
    immediate: true,
  },
);

watch(
  () => unref(getProps).schemas,
  () => {
    const { schemas } = unref(getProps);
    if (!schemas) return;
    setSchema(schemas);
  },
  {
    immediate: true,
  },
);

defineExpose(formAction);
onMounted(() => {
  emit('register', formAction);
});

const _props = reactive({});

function setContentProps(values: Recordable) {
  for (const key in values) {
    if (Object.prototype.hasOwnProperty.call(values, key)) {
      const value = values[key];
      _props[key] = value;
    }
  }
}

watch(getBindValue, setContentProps, { immediate: true, deep: true });

provide(schemaFormContextKey, reactive({
  ...toRefs(_props),
  action: formAction,
}));
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <ElForm
      ref="formRef"
      :model="getModel"
      v-bind="{
        ...getBindValue,
        schemas: undefined,
        actions: undefined,
        rolProps: undefined,
        colProps: undefined,
      }"
    >
      <component
        :is="getBindValue.inline ? 'div' : ElRow"
        v-bind="getBindValue.inline ? {} : getBindValue.rolProps"
        :class="{ 'display-inline-block': getBindValue.inline }"
      >
        <SchemaFormItem
          v-for="(schema, index) in getSchema"
          :key="`${String(schema.field)}_${index}`"
          :form-model="getModel"
          :schema="schema"
        >
          <template v-for="item in Object.keys($slots)" #[item]="data">
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </SchemaFormItem>
        <SchemaFormActionButton>
          <template
            v-for="item in ['action']"
            #[item]="data"
          >
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </SchemaFormActionButton>
      </component>
    </ElForm>
  </ElConfigProvider>
</template>

<style>
  .display-inline-block {
    display: inline-block;
  }
</style>
