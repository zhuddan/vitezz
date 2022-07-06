import { Dict } from './dict';
import type { DictOptions, DictTypes, DictValues, FormatDictOptions } from './typings';

export function useDicts<DK extends DictTypes = DictTypes>(keys: DK[], options?: Partial<DictOptions>) {
  const dict = new Dict(keys, options);

  const format = (dictKey: DK, values: string[] | string, options?: Partial<FormatDictOptions>) => {
    return dict.format.call(dict, dictKey, values, options);
  };

  const load = (dictKey?: DK) => {
    return dict.load.call(dict, dictKey);
  };

  const dicts = computed<DictValues<DK>>(() => {
    return dict.data.value;
  });

  return {
    dict,
    dicts,
    load,
    format,
  };
}
