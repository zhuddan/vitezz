import { createAxios, createRuoyiAxiosTransform } from '@zdzz/shared';
import { getToken, removeToken } from '@/utils/cache';
import { useMessage } from '@/hooks/web/useMessage';
import { useAppConfig } from '@/hooks/config/useAppConfig';
const { VITE_APP_API_URL } = useAppConfig();

const { modalError, msgError } = useMessage();
const transform = createRuoyiAxiosTransform({
  removeToken,
  getToken,
  signoutHandler: () => {

  },
  createMessage: (mode, msg) => {
    if (mode == 'modal')
      modalError(msg);
    else if (mode == 'message')
      msgError(msg);
  },
});

export const defHttp = createAxios({
  transform,
  requestOptions: {
    apiUrl: VITE_APP_API_URL,
  },
});
