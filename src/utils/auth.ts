import { CacheTypeEnum } from '@/enums/cacheEnum';

import { useCookieCache } from './cache';

const cookieCache = useCookieCache();

export function setToken(token: string) {
  cookieCache.set(CacheTypeEnum.TOKEN_KEY, token);
}

export function getToken() {
  return cookieCache.get(CacheTypeEnum.TOKEN_KEY);
}

export function removeToken() {
  cookieCache.remove(CacheTypeEnum.TOKEN_KEY);
}
