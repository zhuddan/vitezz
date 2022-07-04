import { defHttp } from '@/utils/http';

export type DICT_TYPE = 'sys_job_group' | 'sys_job_status';
interface DICT_DATA {
  value: string;
  label: string;
  // other value
  code: string;
  // other label
  name: string;
  title: string;
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType: DICT_TYPE) {
  return defHttp.get({
    url: '/system/dict/data/type/' + dictType,
  });
}

export function useDicts<EE extends DICT_TYPE>(_args: EE[]) {
  type Dict = {
    [key in EE]: Array<Pick<DICT_DATA, 'value' | 'label'>>;
  };

  function getDefaultData() {
    const res = {} as Dict;
    for (let index = 0; index < _args.length; index++) {
      const key = _args[index];
      res[key] = [];
    }
    return res;
  }

  const dicts = ref<Dict>(getDefaultData());

  async function load(dictKey?: EE) {
    if (dictKey) {
      dicts.value[dictKey] = await getDicts(dictKey);
    }
    for (let index = 0; index < _args.length; index++) {
      const key = _args[index];
      dicts.value[key] = await getDicts(key);
    }
  }

  load();

  return { dicts, load };
}
