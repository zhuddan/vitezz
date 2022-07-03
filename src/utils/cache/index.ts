import { useCache } from '@/hooks/web/useCache';

const webCache = useCache();

export function setToken(value: string) {
  webCache.set('token', value, { day: 7 });
}

export function getToken() {
  return webCache.get('token');
}

export function removeToken() {
  webCache.remove('token');
}
