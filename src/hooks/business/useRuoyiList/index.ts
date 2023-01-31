import { useRuoyiRequest } from './request';
import type { RuoyiListRequestUrl } from './typings';

interface ss {
  urls: RuoyiListRequestUrl;
}

export function useRuoyiList(opt: ss) {
  const { getList } = useRuoyiRequest(opt.urls);
  getList();
}