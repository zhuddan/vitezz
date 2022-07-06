import { Dict } from './dict';
import type { DictOptions, DICT_TYPE, FormatDictOptions } from './typings';

export function useDicts<DK extends DICT_TYPE = DICT_TYPE>(keys: DK[], options?: Partial<DictOptions>) {
  const dict = new Dict(keys, options);

  const format = (dictKey: DK, values: string[] | string, options?: Partial<FormatDictOptions>) => {
    return dict.format.call(dict, dictKey, values, options);
  };

  const load = (dictKey?: DK) => {
    return dict.load.call(dict, dictKey);
  };

  const dicts = dict.data;

  return {
    dict,
    dicts,
    load,
    format,
  };
}
