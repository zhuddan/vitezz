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

// 登录方法
export function login(username: string, password: string, code: string, uuid: string) {
  const data = {
    username,
    password,
    code,
    uuid,
  };
  return defHttp.post<MergeBaseResData<{ token: string }>>(
    {
      url: '/login',
      data: data,
    },
    {
      withToken: false,
    },
  );
}
