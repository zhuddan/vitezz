import type { App } from 'vue';

import { isObject } from './is';

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src as T;
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  console.log(comp);
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};

// string
/**
 *
 * @param str
 * @param strict 严格模式
 * eg:
 *  capitalize('userName', true) ==> Username
 *  capitalize('userName', false) ==> UserName
 * @returns
 */
export function capitalize(str: string, strict = true) {
  const str1 = str.slice(0, 1).toUpperCase();
  const str2 = str.slice(1);
  return `${str1}${strict ? str2.toLocaleLowerCase() : str2}`;
}
