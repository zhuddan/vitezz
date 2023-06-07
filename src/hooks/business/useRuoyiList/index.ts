import type { RuoyiListRequestUrl } from './typings';

import { useRuoyiRequest } from './request';

interface ss {
  urls: RuoyiListRequestUrl;
}

export function useRuoyiList(opt: ss) {
  const { getList } = useRuoyiRequest(opt.urls);
  getList();
}