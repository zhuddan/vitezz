import { useCache } from '@/hooks/web/useCache';

const webCache = useCache();

export function setToken(value: string) {
  webCache.set('TOKEN', value, { day: 7 });
}

export function getToken() {
  return webCache.get('TOKEN');
}

export function removeToken() {
  webCache.remove('TOKEN');
}
