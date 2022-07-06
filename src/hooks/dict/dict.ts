import { defHttp } from '@/utils/http';
import { isArray, isObject, isString } from '@/utils/is';
import type {
  DictOptions,
  DictValues,
  DictData,
  DictDataKey,
  DictTypes,
  FormatDictOptions,
  OriginDictData,
  DictMap,
  DictState,
} from './typings';

// 根据字典类型查询字典数据信息
export function getDicts(dictType: DictTypes) {
  return defHttp.get<ResData<OriginDictData[]>>({
    url: `/system/dict/data/type/${dictType}`,
  });
}
const DEFAULT_LABEL_FIELDS: DictDataKey = ['label', 'dictLabel', 'name', 'title'];
const DEFAULT_VALUE_FIELDS: DictDataKey = ['value', 'dictValue', 'code', 'key'];
const defaultFormatOptions: FormatDictOptions = {
  separator: '/',
  labelField: 'label',
  valueField: 'value',
  primitive: false,
};

export class BaseDict {
  options: DictOptions = {
    isLazy: false,
    labelFields: DEFAULT_LABEL_FIELDS,
    valueFields: DEFAULT_VALUE_FIELDS,
    retryTime: 1,
    retryTimeout: 1 * 500,
  };

  get labelFields() {
    return Array.from(new Set(this.options.labelFields));
  }

  get valueFields() {
    return Array.from(new Set(this.options.valueFields));
  }

  isEqual<T>(value: T, oldValue: T) {
    if (isObject(value) || isArray(value)) {
      return JSON.stringify(value) == JSON.stringify(oldValue);
    }
    return value == oldValue;
  }

  constructor(options?: Partial<DictOptions>) {
    this.options = Object.assign({}, this.options, options || {});
  }
}

export class Dict<DK extends DictTypes = DictTypes> extends BaseDict {
  keys: DK[] = [];

  dictMeta = {} as DictMap<DK, DictMeta>;

  private _data = reactive<DictValues<DK>>({} as DictValues<DK>);

  get data() {
    for (const _key in this.dictMeta) {
      const key = _key as DK;
      if (Object.prototype.hasOwnProperty.call(this.dictMeta, key)) {
        const element = this.dictMeta[key];
        this._data[key] = element.primitiveData as any;
      }
    }
    return this._data as DictValues<DK>;
  }

  constructor(keys: DK[], options?: Partial<DictOptions>) {
    super(options);
    this.keys = keys;
    this.init();
  }

  private init() {
    for (let index = 0; index < this.keys.length; index++) {
      const key = this.keys[index];
      this.dictMeta[key] = new DictMeta(key, this.options);
    }
  }

  load(dictKey?: DK): Promise<DictData[] | DictData[][]> {
    return new Promise(async (resolve) => {
      if (dictKey) {
        const data = await this.dictMeta[dictKey].load();
        resolve(data);
        return;
      }
      Promise.all(this.keys.map((e) => this.dictMeta[e].load())).then((res) => {
        resolve(res);
      });
    });
  }

  format(dictKey: DK | OriginDictData[], values: string[] | string, options?: Partial<FormatDictOptions>) {
    if (isString(dictKey)) {
      return this.formatByDictKey(dictKey, values, options);
    }
    return this.formatByDictData(dictKey, values, options);
  }

  private formatByDictKey(dictKey: DK, values: string[] | string, options?: Partial<FormatDictOptions>) {
    if (this.dictMeta[dictKey].state != 'fulfilled') {
      return '';
    }
    const data = this.data[dictKey];
    return this.handleFormat(data, values, options);
  }

  private formatByDictData(
    data: OriginDictData[],
    values: string[] | string,
    options?: Partial<FormatDictOptions>,
  ) {
    return this.handleFormat(data, values, options);
  }

  private handleFormat(
    data: Array<OriginDictData | DictData>,
    values: string[] | string,
    options?: Partial<FormatDictOptions>,
  ) {
    const opt = Object.assign({}, defaultFormatOptions, options || {});
    if (isArray(values)) {
      return values.map((e) => this.formatValue(data, e, opt)).join(opt.separator);
    } else {
      return this.formatValue(data, values, opt);
    }
  }

  private formatValue(data: Array<OriginDictData | DictData>, value: string, options: FormatDictOptions) {
    const res = data.find((e) => e[options.valueField] == value) || {};
    if (!res) {
      const _options = data.map((e) => ({
        label: e[options.labelField],
        value: e[options.valueField],
      }));
      console.warn(
        `[Dict format warning]: Can not find the dictionary with value ${value} in data: `,
        _options,
      );
      return '';
    }
    if (options.primitive) {
      return res;
    }
    return res?.[options.labelField];
  }
}

class DictMeta extends BaseDict {
  name;
  constructor(name: DictTypes, options?: Partial<DictOptions>) {
    super(options);
    this.name = name;
    this.init();
  }

  private init() {
    if (!this.options.isLazy) {
      this.load();
    }
  }

  async load() {
    this.data = await this.requestDicts();
    return this.data;
  }

  _state = ref<DictState>('pending');

  time = 0;

  set state(data: DictState) {
    if (this.isEqual(this._state.value, data)) {
      return;
    }
    this._state.value = data;
  }

  get state() {
    return this._state.value;
  }

  _data = ref<DictData[]>([]);

  set data(data: DictData[]) {
    if (this.isEqual(this._data.value, data)) {
      return;
    }
    this._data.value = data;
  }

  get data() {
    return this._data.value;
  }

  get primitiveData() {
    return this._data;
  }

  private requestDicts(): Promise<DictData[]> {
    this.state = 'pending';
    this.time++;
    return new Promise((resolve, reject) => {
      return getDicts(this.name)
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
  const res = { raw: data } as unknown as DictData;
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
