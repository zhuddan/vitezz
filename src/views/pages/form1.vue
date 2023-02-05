<script setup lang="ts">
import SchemaForm, { useForm } from '@/components/SchemaForm';
import Icon from '@/components/Icon';
import { useRuoyiDicts } from '@/hooks/business/useRuoyiDicts';
import { HighLight } from '@/components/HighLight';

const form1 = ref({
  name: '我是真爱坤',
  sex: '0',
  age: 18,
  grade: 'A',
  birthday: '2000-08-08',
  like: ['sing', 'dance', 'rap'],
  address: [],
  color: '#ffccff',
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

const f = ref<any>('Input');
const type1 = ref('button');

const { sys_user_sex, sys_common_status } = useRuoyiDicts(['sys_user_sex', 'sys_common_status']);
const loading = ref(false);
const inline = ref(false);

const [register, { resetFields, validate }] = useForm({
  scrollToError: true,
  size: 'large',
  labelPosition: 'top',
  rules,
  colProps: {
    span: 24,
    sm: 12,
    md: 6,
    lg: 4,
  },
  rolProps: {
    gutter: 20,
  },
  model: form1,
  inline,
  schemas: [
    {
      component: f,
      field: 'name',
      label: '姓名',
      componentProps: {
        type: type1,
        inputStyle: {
          color: 'red',
        },
      },
    },
    {
      component: 'DatePicker',
      field: 'birthday',
      label: '生日',
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
      component: 'Select',
      field: 'grade',
      label: '推荐等级',
      componentProps: {
        options: [
          { label: 'A', value: 'A' },
        ],
      },
      // componentProps: {
      //   options: [
      //     { label: 'A', value: 'A' },
      //     { label: 'B', value: 'B' },
      //     { label: 'C', value: 'C' },
      //   ],
      // },
    },
    {
      component: 'RadioGroup',
      field: 'sex',
      label: '性别',
      componentProps: {
        options: [
          {
            label: '男',
            value: '0',
            // size:'l'
            optionProps: {
              border: true,
            },
          },
          {

            label: '女',
            value: '1',
          },
          {
            label: '未知',
            value: '2',
          },
        ],
        onChange(v: any) {
          console.log('sex change:', v);
        },
      },
    },
    {
      component: 'CheckboxGroup',
      field: 'like',
      label: '特长',
      componentProps: {
        min: 1,
        options: [
          { label: '唱', value: 'sing', optionProps: { size: 'small' } },
          { label: '跳', value: 'dance' },
          { label: 'rap', value: 'rap' },
          { label: '篮球', value: 'basketball' },
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
    {
      component: 'ColorPicker',
      label: '颜色',
      field: 'color',
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

  <div>
    <button @click="inline = !inline">
      {{ inline ? 'inline' : 'block' }}
    </button>
  </div>
  <SchemaForm @register="register" @submit="handleSubmit" />
</template>

<style scoped>

</style>