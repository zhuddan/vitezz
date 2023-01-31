<script setup lang="ts">
import SchemaForm, { useForm } from '@/components/SchemaForm';
import { useVModel } from '@vueuse/core';
import type { FormItemRule } from 'element-plus';
import Icon from '@/components/Icon';
import { useRuoyiDicts } from '@/hooks/business/useRuoyiDicts';
const props = defineProps({
  test: {
    type: String,
  },
});
const t = useVModel(props, 'test');
const data = ref({
  name: '蔡徐坤',
  sex: '0',
  age: 2.5,
  grade: 3,
  like: ['sing', 'dance', 'rap'],
});

const rules = ref<FormRules<typeof data.value>>({
  name: [{
    required: true,
    message: '姓名不能为空',
  }],
  age: [{
    required: true,
    message: '年龄不能为空',
  },
  {
    type: 'number',
    max: 35,
    message: '年龄不能大于35',
    trigger: ['change'],
  },
  {
    type: 'number',
    min: 18,
    message: '年龄不能小于18',
    trigger: ['change'],
  }],
});

const { sys_user_sex } = useRuoyiDicts(['sys_user_sex']);
const l = ref(false);

const [register, { resetFields, validate }] = useForm({
  size: 'default',
  labelPosition: 'top',
  rules,
  colProps: {
    span: 12,
  },
  rolProps: {
    gutter: 20,
  },
  model: data,
  schemas: [
    {
      component: 'Input',
      field: 'name',
      label: '姓名',
    },
    {
      component: 'InputNumber',
      field: 'age',
      label: '年龄',
      componentProps: {
        controlsPosition: 'right',
      },
    },
    {
      component: 'RadioGroup',
      field: 'sex',
      label: '性别',
      componentProps: {
        options: sys_user_sex,
      },
    },
    {
      component: 'Select',
      field: 'grade',
      label: '考试成绩',
      componentProps: {
        options: [
          { label: 'A', value: 3 },
          { label: 'B', value: 2 },
          { label: 'C', value: 1 },
        ],
        loading: true,
      },
    },
    {
      component: 'CheckboxGroup',
      field: 'like',
      label: '考试成绩',
      componentProps: {
        multiple: true,
        options: [
          { label: '唱', value: 'sing' },
          { label: '跳', value: 'dance' },
          { label: 'rap', value: 'rap' },
          { label: '篮球', value: 'basketball' },
        ],
      },
    },

  ],
  actions: [
    {
      type: 'primary',
      text: '提交',
      action: 'submit',
      icon: h(Icon, {
        icon: 'ep:check',
      }),
      loading: l,
      plain: true,
    },
  ],
});

function handleResetFields() {
}

function handleSubmit(e: any) {
  l.value = true;
  console.log(e);
  setTimeout(() => {
    l.value = false;
  }, (500));
}
</script>

<template>
  <SchemaForm @register="register" @submit="handleSubmit" />
</template>

<style scoped>

</style>