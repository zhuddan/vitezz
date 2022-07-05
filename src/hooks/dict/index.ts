import { Dict } from './dict';
import type { DictOptions, DICT_TYPE, formatDictOptions } from './typings';

export function useDicts<KK extends DICT_TYPE = DICT_TYPE>(keys: KK[], options?: Partial<DictOptions>) {
  const dict = new Dict(keys, options);
  return {
    dicts: dict.data,
    format: (dictKey: KK, values: string[] | string, options?: formatDictOptions) =>
      dict.format.call(dict, dictKey, values, options),
  };
}
