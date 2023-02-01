<script setup lang="ts">
import SchemaForm, { useForm } from '@/components/SchemaForm';
import Icon from '@/components/Icon';
import { useRuoyiDicts } from '@/hooks/business/useRuoyiDicts';
import { HighLight } from '@/components/HighLight';

const form1 = ref({
  name: '蔡徐坤',
  sex: '0',
  age: 2.5,
  grade: 3,
  like: ['sing', 'dance', 'rap'],
  address: [],
});

type Form1Type = typeof form1.value;

const rules = ref<FormRules<Form1Type>>({
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

const { sys_user_sex, sys_common_status } = useRuoyiDicts(['sys_user_sex', 'sys_common_status']);
const loading = ref(false);

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
  model: form1,
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
        onChange(v) {
          console.log('sex change:', v);
        },
      },
    },

    {
      component: 'CheckboxGroup',
      field: 'like',
      label: '特长',
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
    {
      component: 'Select',
      field: 'grade',
      label: '推荐等级',
      componentProps: {
        options: [
          { label: 'A', value: 3 },
          { label: 'B', value: 2 },
          { label: 'C', value: 1 },
        ],
      },
    },
    {
      component: 'Cascader',
      field: 'address',
      label: '地址',
      componentProps: {
        clearable: true,
        options: [
          {
            label: '云南', value: 'yn',
            children: [
              {
                label: '昆明市', value: 'yn',
                children: [
                  {
                    label: '五华区', value: 'wh',
                  },
                  {
                    label: '盘龙区', value: 'pl',
                  },
                ],
              },
              {
                label: '玉溪市', value: 'yx',
                children: [
                  {
                    label: '红塔区', value: 'ht',
                  },
                  {
                    label: '江川区', value: 'jc',
                  },
                ],
              },
            ],
          },
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
      loading,
      plain: true,
    },
  ],
});

function handleResetFields() {

}

function handleSubmit(e: any) {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, (500));
}
</script>

<template>
  <HighLight :code="form1" language="json" />
  <SchemaForm @register="register" @submit="handleSubmit" />
</template>

<style scoped>

</style>