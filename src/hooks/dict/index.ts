import { defHttp } from '@/utils/http';

// 根据字典类型查询字典数据信息
export function getDicts(dictType: DICT_TYPE) {
  return defHttp.get<ResData<ORIGIN_DICT_DATA[]>>({
    url: '/system/dict/data/type/' + dictType,
  });
}

type DICT_TYPE = 'sys_job_group' | 'sys_job_status';
interface ORIGIN_DICT_DATA {
  id: string;
  //
  value: string;
  label: string;
  // other value
  code: string;
  key: string;
  // other label
  name: string;
  title: string;
}

interface DICT_DATA {
  value: string;
  label: string;
  raw: Partial<ORIGIN_DICT_DATA>;
}

type DICT_DATA_KEY = Array<keyof ORIGIN_DICT_DATA>;

const DEFAULT_LABEL_FIELDS: DICT_DATA_KEY = ['label', 'name', 'title'];
const DEFAULT_VALUE_FIELDS: DICT_DATA_KEY = ['value', 'code', 'key'];

function format(data: ORIGIN_DICT_DATA) {
  const res = {
    row: data,
  } as unknown as DICT_DATA;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const element = data[key];
      const labelField = determineDictField(element, ...DEFAULT_LABEL_FIELDS);
      const valueField = determineDictField(element, ...DEFAULT_VALUE_FIELDS);
      res.label = data[labelField];
      res.value = data[valueField];
    }
  }
  return res;
}

function determineDictField(dict: Partial<ORIGIN_DICT_DATA>, ...fields: Array<keyof ORIGIN_DICT_DATA>) {
  return fields.find((f) => Object.prototype.hasOwnProperty.call(dict, f)) as keyof ORIGIN_DICT_DATA;
}

function requestDicts(dictType: DICT_TYPE): Promise<DICT_DATA[]> {
  return new Promise((resolve) => {
    getDicts(dictType)
      .then((res) => {
        resolve(compileDict(res.data));
      })
      .catch(() => {
        resolve(compileDict([]));
      });
  });
}

function compileDict(list: ORIGIN_DICT_DATA[]): DICT_DATA[] {
  return list.map((e) => format(e));
}

interface OPT {
  isLazy: boolean;
}

const defaultOptions: OPT = {
  isLazy: false,
};

export function useDicts<EE extends DICT_TYPE = DICT_TYPE>(_args: EE[], options?: OPT) {
  type Dict = {
    [key in EE]: DICT_DATA[];
  };

  const opt = Object.assign({}, defaultOptions, options || {});

  function init() {
    const res = {} as Dict;
    for (let index = 0; index < _args.length; index++) {
      const key = _args[index];
      res[key] = [];
    }
    return res;
  }

  const dicts = ref<Dict>(init());

  async function load(dictKey?: EE): Promise<void> {
    return new Promise(async (resolve) => {
      if (dictKey) {
        dicts.value[dictKey] = await requestDicts(dictKey);
        resolve();
        return;
      }

      for (let index = 0; index < _args.length; index++) {
        const key = _args[index];
        dicts.value[key] = await requestDicts(key);
      }
      resolve();
    });
  }

  if (!opt.isLazy) {
    load();
  }

  return { dicts, load };
}
