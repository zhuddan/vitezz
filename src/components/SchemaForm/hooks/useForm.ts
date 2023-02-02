import { useAppConfig } from '@/hooks/config/useAppConfig';

import type { FormAction, FormProps } from '../types';

type UseFormReturn = [(instance: FormAction) => void, FormAction];

export default function useForm<T extends object>(props?: Partial<MaybeRefRecordWrap<FormProps<T>>>): UseFormReturn {
  const settings = useAppConfig();
  const formAction = ref<Nullable<FormAction>>(null);
  const loadedRef = ref<Nullable<boolean>>(false);
  const isProdMode = settings.MODE == 'production';
  async function getForm() {
    const form = unref(formAction);
    if (!form) {
      throw new Error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!',
      );
    }
    await nextTick();
    return form as FormAction;
  }

  function register(instance: FormAction) {
    if (isProdMode) {
      // 开发环境下，组件卸载后释放内存
      onUnmounted(() => {
        formAction.value = null;
        loadedRef.value = null;
      });
    }

    // form 组件实例 instance 已存在
    // 实际上 register 拿到的并不是 组件实例， 只是挂载了一些组件内部方法的 对象 formAction
    if (unref(loadedRef) && isProdMode && instance === unref(formAction))
      return;

    formAction.value = instance;
    loadedRef.value = true;

    // 监听 props， 若props改变了
    // 则使用 form 实例调用内部的 setProps 方法将新的props设置到form组件内部
    watch(
      () => props,
      () => {
        if (props) {
          console.log();
          instance.setProps(props);
        }
      },
      { immediate: true, deep: true },
    );
  }

  const methods: FormAction = {
    async setProps(newFormProps: Partial<MaybeRefRecordWrap<FormProps<T>>>) {
      const form = await getForm();
      form.setProps(newFormProps);
    },
    async validate(callback?: (valid: any) => void) {
      const form = await getForm();
      form.validate(callback);
    },
    async validateField(props: string | string[], callback: (err: string) => void) {
      const form = await getForm();
      form.validateField(props, callback);
    },
    async resetFields() {
      const form = await getForm();
      form.resetFields();
    },
    async clearValidate() {
      const form = await getForm();
      form.clearValidate();
    },
    async scrollToField(prop: string) {
      const form = await getForm();
      form.scrollToField(prop);
    },
  };

  return [register, methods];
}
