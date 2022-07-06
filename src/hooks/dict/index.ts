import { Dict } from './dict';
import type { DictOptions, DICT_TYPE, FormatDictOptions } from './typings';

export function useDicts<KK extends DICT_TYPE = DICT_TYPE>(keys: KK[], options?: Partial<DictOptions>) {
  const dict = new Dict(keys, options);

  const format = (dictKey: KK, values: string[] | string, options?: FormatDictOptions) => {
    return dict.format.call(dict, dictKey, values, options);
  };

  const dicts = dict.data;

  return {
    dict,
    dicts,
    format,
  };
}
