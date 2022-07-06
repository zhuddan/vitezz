import { CacheEnums } from '@/enums/cacheEnum';
import { isObject } from '@/utils/is';
import { name as projectName, version as projectVersion } from '../../../package.json';

type _CacheEnums = typeof CacheEnums;

export type CacheEnumsKey = keyof _CacheEnums;

interface Time {
  day: number;
  hour: number;
  minutes: number;
  second: number;
}

interface WebCacheData {
  value: any;
  expires: number;
}

class WebCache {
  defaultExpires = 1 * 1000;

  get VALUE_PREFIX() {
    return `${projectName}_${projectVersion}_`;
  }

  assembleKey(key: CacheEnumsKey) {
    return `${this.VALUE_PREFIX}${CacheEnums[key]}`;
  }

  formatKey(key: string): string {
    if (key.indexOf(this.VALUE_PREFIX) == 0) {
      return key.replace(this.VALUE_PREFIX, '') as CacheEnumsKey;
    }
    return key;
  }

  constructor(time?: number | Time) {
    if (!time) return;
    const t = isObject(time) ? this.formatTime(time) : time;
    this.defaultExpires = t;
  }

  formatTime({ day, hour, minutes, second }: Partial<Time>): number {
    const dataDay = (day ? day * 24 : 0) * 60 * 60 * 24;
    const dataHours = (hour || 0) * 60 * 60;
    const dataMinutes = (minutes || 0) * 60;
    const dataSeconds = (second || 0) * 60;
    return (dataDay + dataHours + dataMinutes + dataSeconds) * 1000;
  }

  getExpires(time?: Partial<Time>): number {
    let expires = this.defaultExpires;
    if (time || isObject(time)) {
      expires = this.formatTime(time);
    }
    return new Date().getTime() + expires;
  }

  stringifyJson(data: any): string {
    try {
      return JSON.stringify(data);
    } catch (error) {
      throw new Error(error as any);
    }
  }

  parseJson(data: string): object {
    try {
      return JSON.parse(data);
    } catch (error) {
      throw new Error(error as any);
    }
  }

  set(key: CacheEnumsKey, value: any, options?: Partial<Time>) {
    const _key = this.assembleKey(key);
    const data = this.stringifyJson({
      value,
      expires: this.getExpires(options),
    });
    localStorage.setItem(_key, data);
  }

  get(key: CacheEnumsKey) {
    const _key = this.assembleKey(key);
    const res = localStorage.getItem(_key);
    if (!res) return null;
    const { expires, value } = this.parseJson(res) as WebCacheData;
    const now = Date.now();
    if (expires < now) {
      this.remove(key);
      return null;
    }
    return value;
  }

  remove(key: CacheEnumsKey) {
    const _key = this.assembleKey(key);
    localStorage.removeItem(_key);
  }

  clear() {
    localStorage.clear();
  }
}

const webCache = new WebCache();

export function useCache() {
  return webCache;
}
