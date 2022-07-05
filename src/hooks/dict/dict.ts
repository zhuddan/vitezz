import { defHttp } from '@/utils/http';
import { isArray } from '@/utils/is';
import type {
  DictOptions,
  DictValues,
  DictData,
  DictDataKey,
  DICT_TYPE,
  FormatDictOptions,
  OriginDictData,
  DictState,
  DictMap,
} from './typings';

// 根据字典类型查询字典数据信息
export function getDicts(dictType: DICT_TYPE) {
  return defHttp.get<ResData<OriginDictData[]>>({
    url: '/system/dict/data/type/' + dictType,
    // timeout: 10,
  });
}

const DEFAULT_LABEL_FIELDS: DictDataKey = ['label', 'dictLabel', 'name', 'title'];
const DEFAULT_VALUE_FIELDS: DictDataKey = ['value', 'dictValue', 'code', 'key'];

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

  state = {} as DictState<KK>;

  get data() {
    return this._data.value;
  }

  constructor(keys: KK[], options?: Partial<DictOptions>) {
    this.options = Object.assign({}, this.options, options || {});
    this.keys = keys;
    this.init();
    console.log(this);
  }

  getDefaultValue<T>(value: T) {
    const defaultValue = {} as DictMap<KK, T>;
    for (let index = 0; index < this.keys.length; index++) {
      const key = this.keys[index];
      defaultValue[key] = value;
    }
    return defaultValue;
  }

  init() {
    this._data.value = this.getDefaultValue([]);
    this.state = this.getDefaultValue('pending');
    if (!this.options.isLazy) {
      this.loadAll();
    }
  }

  loadAll(): Promise<DictData[][]> {
    return Promise.all(this.keys.map((f) => this.load(f)));
  }

  load(dictKey: KK): Promise<DictData[]> {
    return new Promise(async (resolve) => {
      const data = await this.requestDicts(dictKey);
      this._data.value[dictKey] = data;
      resolve(data);
    });
  }

  requestDicts(dictKey: KK): Promise<DictData[]> {
    return new Promise((resolve) => {
      getDicts(dictKey)
        .then((res) => {
          this.state[dictKey] = 'fulfilled';
          resolve(compileDict(res.data, this.labelFields, this.valueFields));
        })
        .catch((e) => {
          this.state[dictKey] = 'rejected';
          console.error(e);
        });
    });
  }

  format(dictKey: KK, values: string[] | string, options?: FormatDictOptions) {
    if (this.state[dictKey] == 'pending') {
      return '';
    }
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
    const res = data.find((e) => e.value == value)?.label;
    if (!res) {
      const options = data.map((e) => ({
        label: e.label,
        value: e.value,
      }));
      console.warn(
        `[Dict format warning]: Can not find the dictionary with value ${value} in data: `,
        options,
      );
      return '';
    }
    return res;
  }
}

function compileDict(list: OriginDictData[], labelFields: DictDataKey, valueFields: DictDataKey): DictData[] {
  return list.map((e) => convertDict(e, labelFields, valueFields));
}

function convertDict(data: OriginDictData, labelFields: DictDataKey, valueFields: DictDataKey) {
  const res = { row: data } as unknown as DictData;
  const labelField = getDictField(data, ...labelFields);
  const valueField = getDictField(data, ...valueFields);
  res.label = data[labelField];
  res.value = data[valueField];
  return res;
}

function getDictField(dict: Partial<OriginDictData>, ...fields: Array<keyof OriginDictData>) {
  const res = fields.find((f) => Object.prototype.hasOwnProperty.call(dict, f)) as keyof OriginDictData;
  if (!res) {
    console.warn(`[Dict get field error]: Object cannot find key \`${fields.join(',')}\` in `, dict);
  }
  return res;
}
