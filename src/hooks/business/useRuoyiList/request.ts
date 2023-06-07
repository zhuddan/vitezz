import type { RuoyiListRequestUrl, UrlObj } from './typings';

import { defHttp } from '@/utils/http';

export function createRuoyiRequestUrl(option: RuoyiListRequestUrl): UrlObj {
  if (option instanceof Array) {
    const base = option.join('/');
    return {
      list: `/${base}/list`,
      query: `/${base}/`,
      add: `/${base}`,
      edit: `/${base}`,
      del: `/${base}/`,
    };
  }
  return option;
}

export function useRuoyiRequest(option: RuoyiListRequestUrl) {
  const {
    list,
    query,
    add,
    edit,
    del,
  } = createRuoyiRequestUrl(option);
  const getList = () => defHttp.get({
    url: list,
  });
  console.log(list,
    query,
    add,
    edit,
    del);
  return {
    getList,
  };
}