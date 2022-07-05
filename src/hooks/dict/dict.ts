import { defHttp } from '@/utils/http';
import { isArray } from '@/utils/is';
import type {
  DictOptions,
  DictValues,
  DictData,
  DICT_DATA_KEY,
  DICT_TYPE,
  FormatDictOptions,
  OriginDictData,
} from './typings';

// 根据字典类型查询字典数据信息
export function getDicts(dictType: DICT_TYPE) {
  return defHttp.get<ResData<OriginDictData[]>>({
    url: '/system/dict/data/type/' + dictType,
  });
}

const DEFAULT_LABEL_FIELDS: DICT_DATA_KEY = ['label', 'dictLabel', 'name', 'title'];
const DEFAULT_VALUE_FIELDS: DICT_DATA_KEY = ['value', 'dictValue', 'code', 'key'];

export class Dict<KK extends DICT_TYPE = DICT_TYPE> {
  options: DictOptions = {
    isLazy: false,
    labelFields: DEFAULT_LABEL_FIELDS,
    valueFields: DEFAULT_VALUE_FIELDS,
  };

  get labelFields() {
    return Array.from(new Set(this.options.labelFields));
  }

  get valueFields() {
    return Array.from(new Set(this.options.valueFields));
  }

  keys: KK[] = [];

  _data = ref<DictValues<KK>>({} as DictValues<KK>);

  get data() {
    return this._data.value;
  }

  constructor(keys: KK[], options?: Partial<DictOptions>) {
    this.options = Object.assign({}, this.options, options || {});
    this.keys = keys;
    this.init();
  }

  getDefaultValue() {
    const defaultValue = {} as DictValues<KK>;
    for (let index = 0; index < this.keys.length; index++) {
      const key = this.keys[index];
      defaultValue[key] = [];
    }
    return defaultValue;
  }

  init() {
    this._data.value = this.getDefaultValue();
    if (!this.options.isLazy) {
      this.load();
    }
  }

  load(dictKey?: KK): Promise<void> {
    return new Promise(async (resolve) => {
      if (dictKey) {
        this._data.value[dictKey] = await this.requestDicts(dictKey);
        resolve();
        return;
      }
      for (let index = 0; index < this.keys.length; index++) {
        const key = this.keys[index];
        this._data.value[key] = await this.requestDicts(key);
      }
      resolve();
    });
  }

  requestDicts(dictType: DICT_TYPE): Promise<DictData[]> {
    return new Promise((resolve) => {
      getDicts(dictType)
        .then((res) => {
          resolve(compileDict(res.data, this.labelFields, this.valueFields));
        })
        .catch(() => {
          resolve(compileDict([], this.labelFields, this.valueFields));
        });
    });
  }

  format(dictKey: KK, values: string[] | string, options?: FormatDictOptions) {
    const defaultOpt: FormatDictOptions = { separator: '/' };
    const data = this.data[dictKey];
    const opt = Object.assign({}, defaultOpt, options || {});
    if (isArray(values)) {
      return values.map((e) => this.baseFormatDict(data, e)).join(opt.separator);
    } else {
      return this.baseFormatDict(data, values);
    }
  }

  baseFormatDict(data: DictData[], value: string) {
    return data.find((e) => e.value == value)?.label || '';
  }
}

function compileDict(
  list: OriginDictData[],
  labelFields: DICT_DATA_KEY,
  valueFields: DICT_DATA_KEY,
): DictData[] {
  return list.map((e) => convertDict(e, labelFields, valueFields));
}

function convertDict(data: OriginDictData, labelFields: DICT_DATA_KEY, valueFields: DICT_DATA_KEY) {
  const res = { row: data } as unknown as DictData;
  const labelField = determineDictField(data, ...labelFields);
  const valueField = determineDictField(data, ...valueFields);
  res.label = data[labelField];
  res.value = data[valueField];
  return res;
}

function determineDictField(dict: Partial<OriginDictData>, ...fields: Array<keyof OriginDictData>) {
  return fields.find((f) => Object.prototype.hasOwnProperty.call(dict, f)) as keyof OriginDictData;
}
