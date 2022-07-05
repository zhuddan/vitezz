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
export function getDicts(dictType: DICT_TYPE, t = 0) {
  console.log(dictType, t);
  return defHttp.get<ResData<OriginDictData[]>>({
    url: t != 5 ? '/stat' : `/system/dict/data/type/${dictType}`,
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
    retryTime: 8,
    retryTimeout: 1 * 500,
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
    this.state = this.getDefaultValue({
      loading: 'pending',
      time: 0,
    });
    if (!this.options.isLazy) {
      this.loadAll();
    }
  }

  loadAll(): Promise<DictData[][]> {
    const promFn = [];
    for (let i = 0; i < this.keys.length; i++) {
      const key = this.keys[i];
      promFn.push(() => this.load(key));
    }

    return Promise.all(promFn.map((e) => e()))
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  }

  load(dictKey: KK): Promise<DictData[]> {
    return new Promise((resolve, reject) => {
      this.requestDicts(dictKey)
        .then((data) => {
          this._data.value[dictKey] = data;
          console.log(this.state[dictKey].time, dictKey);
          console.log(JSON.parse(JSON.stringify(this.state)), dictKey);
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  requestDicts(dictKey: KK): Promise<DictData[]> {
    this.state[dictKey].time++;
    return new Promise((resolve, reject) => {
      return getDicts(dictKey, this.state[dictKey].time)
        .then((res) => {
          this.state[dictKey].loading = 'fulfilled';
          // this.state[dictKey].time = 0;
          resolve(compileDict(res.data, this.labelFields, this.valueFields));
        })
        .catch((e) => {
          console.error(
            `[Dictionary error] Request dictionary data \`${dictKey}\` failed for the \`${this.state[dictKey].time}\` times.`,
          );
          if (this.state[dictKey].time >= this.options.retryTime) {
            console.error(
              `[Dict error] Attempt to repeat the request for dictionary data \`${dictKey}\` for the ${this.state[dictKey].time} times failed. Request has been abandoned.`,
            );
            this.state[dictKey].loading = 'rejected';
            reject(e);
            return;
          }
          const t = setTimeout(() => {
            clearTimeout(t);
            this.requestDicts(dictKey)
              .then((res) => resolve(res))
              .catch((e) => reject(e));
          }, this.options.retryTimeout);
        });
    });
  }

  format(dictKey: KK, values: string[] | string, options?: FormatDictOptions) {
    if (this.state[dictKey].loading != 'fulfilled') {
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
