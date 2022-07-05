import { defHttp } from '@/utils/http';
import { isArray } from '@/utils/is';
import { cloneDeep } from 'lodash-es';
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
  DictStateItem,
} from './typings';

// 根据字典类型查询字典数据信息
export function getDicts(dictType: DICT_TYPE, t = 0) {
  const data = dictType == 'sys_job_group' ? 5 : 3;
  return defHttp.get<ResData<OriginDictData[]>>({
    url: t != data ? '/stat' : `/system/dict/data/type/${dictType}`,
    // timeout: 10,
  });
}

const DEFAULT_LABEL_FIELDS: DictDataKey = ['label', 'dictLabel', 'name', 'title'];
const DEFAULT_VALUE_FIELDS: DictDataKey = ['value', 'dictValue', 'code', 'key'];

export class Base {
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

  constructor(options?: Partial<DictOptions>) {
    this.options = Object.assign({}, this.options, options || {});
  }
}

export class Dict<KK extends DICT_TYPE = DICT_TYPE> extends Base {
  keys: KK[] = [];

  _data = ref<DictValues<KK>>({} as DictValues<KK>);

  state = {} as DictState<KK>;

  dictMeta = {} as DictMap<KK, DictMeta>;

  get data() {
    return this._data.value;
  }

  constructor(keys: KK[], options?: Partial<DictOptions>) {
    super(options);
    this.keys = keys;
    this.init();
    this.init2();
    console.log(this);
  }

  getDefaultValue<T>(value: T) {
    const defaultValue = {} as DictMap<KK, T>;
    for (let index = 0; index < this.keys.length; index++) {
      const key = this.keys[index];
      defaultValue[key] = cloneDeep(value);
    }
    return defaultValue;
  }

  init2() {
    for (let index = 0; index < this.keys.length; index++) {
      const key = this.keys[index];
      this.dictMeta[key] = new DictMeta(key, this.options);
    }
    console.log(this.dictMeta);
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
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  requestDicts(dictKey: KK): Promise<DictData[]> {
    const state = this.state[dictKey];
    state.time++;
    return new Promise((resolve, reject) => {
      return getDicts(dictKey, state.time)
        .then((res) => {
          state.loading = 'fulfilled';
          state.time = 0;
          console.log(state);
          resolve(compileDict(res.data, this.labelFields, this.valueFields));
        })
        .catch((e) => {
          console.error(
            `[Dictionary error] Request dictionary data \`${dictKey}\` failed for the \`${state.time}\` times.`,
          );
          if (state.time >= this.options.retryTime) {
            console.error(
              `[Dict error] Attempt to repeat the request for dictionary data \`${dictKey}\` for the ${state.time} times failed. Request has been abandoned.`,
            );
            state.loading = 'rejected';
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

class Dispatcher {
  handlers: Fn[];
  constructor() {
    this.handlers = [];
  }

  listen(handler: Fn) {
    this.handlers.push(handler);
  }

  emit<T>(...args: T[]) {
    this.handlers.forEach((handler) => {
      handler(...args);
    });
  }

  remove(fn: Fn) {
    const index = this.handlers.findIndex((e) => e == fn);
    this.handlers.splice(index, 1);
  }
}

class DictMeta extends Base {
  name;
  constructor(name: DICT_TYPE, options?: Partial<DictOptions>) {
    super(options);
    this.name = name;
    this.init();
  }

  async init() {
    if (!this.options.isLazy) {
      console.log(!this.options.isLazy);
      this.data = await this.requestDicts();
    }
  }

  _state: DictStateItem = 'pending';

  time = 0;

  set state(data: DictStateItem) {
    this._state = data;
  }

  get state() {
    return this._state;
  }

  _data: DictData[] = [];

  onDataChange = new Dispatcher();

  set data(data: DictData[]) {
    this._data = data;
    this.onDataChange.emit<typeof data>(data);
  }

  get data() {
    return this._data;
  }

  requestDicts(): Promise<DictData[]> {
    this.time++;
    return new Promise((resolve, reject) => {
      return getDicts(this.name, this.time)
        .then((res) => {
          this.state = 'fulfilled';
          this.time = 0;
          resolve(compileDict(res.data, this.labelFields, this.valueFields));
        })
        .catch((e) => {
          console.error(
            `[Dictionary error] Request dictionary data \`${this.name}\` failed for the \`${this.time}\` times.`,
          );
          if (this.time >= this.options.retryTime) {
            console.error(
              `[Dict error] Attempt to repeat the request for dictionary data \`${this.name}\` for the ${this.time} times failed. Request has been abandoned.`,
            );
            this.state = 'rejected';
            reject(e);
            return;
          }
          const t = setTimeout(() => {
            clearTimeout(t);
            this.requestDicts()
              .then((res) => resolve(res))
              .catch((e) => reject(e));
          }, this.options.retryTimeout);
        });
    });
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
