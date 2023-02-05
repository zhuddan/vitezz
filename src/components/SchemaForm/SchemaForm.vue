<script lang="ts" setup>
import type { Ref } from 'vue';
import type { FormAction, FormProps, FormSchema } from './types';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { ElConfigProvider, ElForm, ElRow } from 'element-plus';
import { cloneDeep } from 'lodash-es';
import { isObject } from '@/utils/is';

import { useFormEvents } from './hooks/useFormEvents';
import { formProps } from './props';
import { schemaFormContextKey } from './token';

import SchemaFormAction from './components/SchemaFormAction.vue';
import SchemaFormItem from './components/SchemaFormItem.vue';

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
const getSchema = computed(() => {
  const schemas: FormSchema<any>[] = unref(schemaRef) || (unref(getProps).schemas as any);
  return schemas;
});
const formEvents = useFormEvents({
  emit,
  formElRef: formRef as Ref<FormAction>,
});
function setProps(newFormProps: Partial<MaybeRecordRef<FormProps<any>>>) {
  const defaultFormProps = cloneDeep(props) as unknown as FormProps<any>;
  (propsRef.value as FormProps<any>) = {
    ...defaultFormProps,
    ...propsRef.value,
    ...newFormProps,
  } as FormProps<any>;
}

function setSchema(val: MaybeRef<FormSchema<any>[]>) {
  schemaRef.value = unref(val) as any;
}

const getModel = computed(() => {
  return getBindValue.value.model;
});

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

const formAction: Partial<FormAction> = {
  setProps,
  ...formEvents,
};

function onActionSubmit() {
  formEvents
    .validate()
    .then(() => {
      emit('submit', toRaw(getModel.value));
    })
    .catch((err) => {
      // emit('validateError', err);
      // //  滚动到未验证通过的字段
      // if (getBindValue.value.useScrollToErrorField) {
      //   if (isObject(err)) {
      //     const errFields = Object.keys(err);
      //     errFields.length && formEvents.scrollToField(errFields[0]);
      //   }
      // }
    });
}

function onReset() {
  formEvents?.resetFields();
  emit('reset');
}

function onAction(e: string) {
  if (e == 'submit')
    onActionSubmit();
  if (e == 'reset')
    onReset();
  emit('action', e);
}

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
  ...formAction,
}) as any);
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
        useScrollToErrorField: undefined,
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
      </component>
      <component
        :is="getBindValue.inline ? 'div' : ElRow"
        v-if="getBindValue.actions"
        v-bind="getBindValue.baseRolProps"
        :class="{ 'display-inline-block': getBindValue.inline }"
      >
        <SchemaFormAction
          :form-props="getBindValue"
          @action="onAction"
        />
      </component>
    </ElForm>
  </ElConfigProvider>
</template>

<style>
  .display-inline-block {
    display: inline-block;
  }
</style>
