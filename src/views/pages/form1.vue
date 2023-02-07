<script setup lang="ts">
import SchemaForm, { useForm } from '@/components/SchemaForm';
import Icon from '@/components/Icon';
import { useRuoyiDicts } from '@/hooks/business/useRuoyiDicts';
import { HighLight } from '@/components/HighLight';
import { ElButton } from 'element-plus';
const form1 = ref({
  name: '我是真爱坤',
  sex: '0',
  age: 18,
  grade: 2.5,
  birthday: '2000-08-08',
  like: ['sing', 'dance', 'rap'],
  address: ['yn', 'km', 'wh'],
  color: '#100000',
  liZhi: false,
  time: 2.5,
  fss: [],
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
  color: [{
    validator(rule, value, cb) {
      if (!value) {
        cb('请选择颜色');
        return;
      }
      if (value == '#000000') {
        cb(new Error('小🐓子，露出黑jio了吧'));
        return;
      }
      cb();
    },
  }],
});

const type1 = ref('button');

const { sys_user_sex, sys_common_status } = useRuoyiDicts(['sys_user_sex', 'sys_common_status']);
const loading = ref(false);
const inline = ref(false);

const [register, { resetFields, validate, setProps }] = useForm({
  scrollToError: true,
  size: 'large',
  labelPosition: 'top',
  labelWidth: '4em',
  rules,
  colProps: {
    span: 24,
    sm: 12,
    md: 8,
    lg: 6,
  },
  rolProps: {
    gutter: 40,
  },
  model: form1,
  inline,
  schemas: [
    {
      component: 'Divider',
      label: 'Ikun 信息',
      field: 'divider' as any,
      colProps: {
        span: 24,
      },
    },
    {
      component: 'Input',
      field: 'name',
      label: '姓名',
      componentProps: (a, b) => {
        return {
          inputStyle: {
            color: 'red',
          },
          // size: 'large',
        };
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
      component: 'Divider',
      label: 'Ikun 兴趣爱好',
      field: 'divider' as any,
      colProps: {
        span: 24,
      },
    },
    {
      component: 'ColorPicker',
      label: 'Ikun 最爱的颜色',
      field: 'color',
      componentProps: {
        predefine: [
          '#000000',
        ],
      },
    },

    {
      component: 'CheckboxGroup',
      field: 'like',
      label: '特长',
      componentProps: {
        min: 1,
        options: [
          { label: '唱', value: 'sing' },
          { label: '跳', value: 'dance' },
          { label: 'rap', value: 'rap' },
          { label: '篮球', value: 'basketball' },
        ],
      },
    },
    {
      component: 'Divider',
      label: 'Ikun 其他信息',
      field: 'divider' as any,
      colProps: {
        span: 24,
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
                label: '昆明市', value: 'km',
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
      component: 'Rate',
      field: 'grade',
      label: '真爱粉等级',
      componentProps: {
        allowHalf: true,
        icons: [
          h(Icon, {
            icon: 'openmoji:basketball',
          }),
          h(Icon, {
            icon: 'openmoji:basketball',
          }),
          h(Icon, {
            icon: 'openmoji:basketball',
          }),
        ],
        voidIcon: h(Icon, {
          icon: 'openmoji:basketball',
        }),
      },
    },
    {
      component: 'Switch',
      field: 'liZhi',
      label: '荔枝会不会',
      componentProps: {
        disabled: true,
      },
    },
    {
      component: 'Slider',
      field: 'time',
      label: '练习时长',
      componentProps: {
        min: 2.5,
        max: 2.5,
        marks: {
          2.5: '两年半',
        },
      },
    },
  ],
  ActionBarColProps: {
    span: 24,
  },
});

function handleResetFields() {

}

function handleSubmit(e: any) {
  console.log(e);
  setProps({
    submitButtonOptions: {
      loading: true,
    },
  });
  loading.value = true;
  setTimeout(() => {
    setProps({
      submitButtonOptions: {
        loading: false,
      },
    });
  }, (500));
}
</script>

<template>
  <HighLight :code="form1" language="json" />
  <SchemaForm @register="register" @submit="handleSubmit">
    <template #action>
      <ElButton>插槽按钮</ElButton>
    </template>
  </SchemaForm>
</template>

<style lang="scss">
 .el-icon{
  .app-iconify+.app-iconify {
    display: none !important;
  }
 }
</style>