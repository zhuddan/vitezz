import { defHttp } from '@/utils/http';

// 获取验证码
export function getCodeImg() {
  return defHttp.get(
    {
      url: '/captchaImage',
    },
    {
      withToken: false,
    },
  );
}
