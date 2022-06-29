import Cookies from 'js-cookie';

import { isArray, isObject } from '../is';

export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

function beforeHandleSet(val: any): string {
  if (isObject(val) || isArray(val)) {
    return JSON.stringify(val);
  }
  return val ? val + '' : '';
}

function afterHandleGet(val: any): string | null | undefined {
  try {
    return JSON.parse(val);
  } catch (e) {
    if (val === 'null') {
      return null;
    }
    if (val == 'undefined') {
      return undefined;
    }
    return val;
  }
}

function setLocalItem(key: string, val: any) {
  localStorage.setItem(key, beforeHandleSet(val));
}

function getLocalItem(key: string) {
  return afterHandleGet(localStorage.getItem(key));
}

function removeLocalItem(key: string) {
  localStorage.removeItem(key);
}

function clearLocal() {
  localStorage.clear();
}

export function useLocalCache() {
  return {
    set: setLocalItem,
    get: getLocalItem,
    remove: removeLocalItem,
    clear: clearLocal,
  };
}

function setCookieItem(key: string, val: any, expires?: number) {
  const _expires = new Date();
  const timeOut = expires ?? DEFAULT_CACHE_TIME;
  _expires.setTime(Date.now() + timeOut * 1000);
  Cookies.set(key, beforeHandleSet(val), { expires: _expires });
}

function getCookieItem(key: string) {
  return afterHandleGet(Cookies.get(key));
}

function removeCookieItem(key: string) {
  Cookies.remove(key);
}

function clearCookie() {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (let i = keys.length; i--; ) {
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
    }
  }
}

export function useCookieCache() {
  return {
    set: setCookieItem,
    get: getCookieItem,
    remove: removeCookieItem,
    clear: clearCookie,
  };
}
