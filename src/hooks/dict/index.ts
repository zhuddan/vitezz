import type { ComputedRef, Ref } from 'vue';
import { Dict } from './dict';
import type { DictData, DictMap, DictOptions, DictTypes, DictValues, FormatDictOptions } from './typings';

type DictRef<DK extends DictTypes = DictTypes> = DictMap<DK, Ref<DictData[]>>;

interface DictMapRef<DK extends DictTypes = DictTypes> {
  dict: Dict<DK>;
  format: (
    dictKey: DK,
    values: string[] | string,
    options?: Partial<FormatDictOptions>,
  ) => typeof Dict.prototype.format;
  load: typeof Dict.prototype.load;
  dicts: ComputedRef<DictValues<DK>>;
}
type UseDictsReturn<DK extends DictTypes = DictTypes> = DictRef<DK> & DictMapRef<DK>;

export function useDicts<DK extends DictTypes = DictTypes>(keys: DK[], options?: Partial<DictOptions>) {
  const dict = new Dict(keys, options);
  const format = (dictKey: DK, values: string[] | string, options?: Partial<FormatDictOptions>) => {
    return dict.format.call(dict, dictKey, values, options);
  };

  const load = (dictKey?: DK) => {
    return dict.load.call(dict, dictKey);
  };

  const dicts = computed<DictValues<DK>>(() => {
    return dict.data;
  });

  return {
    dict,
    format,
    load,
    dicts,
    ...toRefs(dict.data),
  } as UseDictsReturn<DK>;
}
