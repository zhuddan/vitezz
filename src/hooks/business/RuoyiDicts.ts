import { defHttp } from '@/utils/http';
import { merge } from 'lodash-es';
import type { Ref } from 'vue';

export interface _OriginDictData {
  // value
  id: string;
  dictCode: number;
  dictValue: string;
  // label
  dictLabel: string;
  // name
  dictType: string;
  // other
  cssClass: string;
  listClass: string;
  isDefault: string;
  status: string;
  default: boolean;

  // other label
  title: string;
  name: string;
  label: string;
  // other value
  value: string | number;
  code: string | number;
  key: string | number;

}
type OriginDictData = Partial<_OriginDictData>;

type DictKeys = Array<keyof _OriginDictData>;

export function getDicts<DT extends string = string>(dictType: DT) {
  return new Promise<ResponseData<OriginDictData[]>>((resolve, reject) => {
    defHttp
      .get<ResponseData<OriginDictData[]>>({
        url: `/system/dict/data/type/${dictType}`,
      })
      .then((res) => {
        if (!res.data) {
          reject(
            `[Dictionary error] Get dictionary data \`${dictType}\` with null.Please check your dictionary key with \`${dictType}\`.`,
          );
        }
        else {
          resolve(res);
        }
      });
  });
}

export interface DictData {
  value: string;
  label: string;
  raw: Partial<_OriginDictData>;
}

interface DictBaseOptions {
  labelFields: DictKeys;
  valueFields: DictKeys;
  isLazy: boolean;
}

const defaultRuoyiDictsOptions: DictBaseOptions = {
  labelFields: ['label', 'dictLabel', 'name', 'title'],
  valueFields: ['value', 'dictValue', 'code', 'key'],
  isLazy: false,
};
export class DictBase {
  options: DictBaseOptions;

  get labelFields() {
    return this.options.labelFields;
  }

  get valueFields() {
    return this.options.valueFields;
  }

  constructor(options: Partial<DictBaseOptions> = {}) {
    this.options = merge(defaultRuoyiDictsOptions, options);
  }
}
export type DictValues<T extends string> = Record<T, DictData[]>;

export class Dict<DT extends string = string> extends DictBase {
  dictTypes: DT[];
  dictMeta = {} as Record<DT, DictMeta>;
  _data = reactive<DictValues<DT>>({} as DictValues<DT>);

  get data() {
    return computed(() => {
      for (const _key in this.dictMeta) {
        const key = _key as DT;
        if (Object.prototype.hasOwnProperty.call(this.dictMeta, key))
          this._data[key] = this.dictMeta[key]._data as any;
      }
      return this._data as DictValues<DT>;
    });
  }

  constructor(dictTypes: DT[], options: Partial<DictBaseOptions> = {}) {
    super(options);
    this.dictTypes = dictTypes;
    this.init();
  }

  init() {
    this.dictTypes.forEach((dt) => {
      this.dictMeta[dt] = new DictMeta<DT>(dt, this.options);
    });
  }
}

export class DictMeta<DT extends string = string> extends DictBase {
  dictType: DT;
  _data: Ref<DictData[]> = ref([]);
  set data(data) {
    this._data.value = data;
  }

  get data() {
    return this._data.value;
  }

  get primitiveData() {
    return this._data;
  }

  constructor(dictType: DT, options: Partial<DictBaseOptions> = {}) {
    super(options);
    this.dictType = dictType;
    this.init();
  }

  init() {
    if (!this.options.isLazy) this.load();
  }

  async load() {
    this.data = await this.requestDicts();
  }

  private requestDicts(): Promise<DictData[]> {
    return new Promise((resolve, reject) => {
      return getDicts(this.dictType)
        .then((res) => {
          return compileDict(res.data, this.labelFields, this.valueFields);
        })
        .then((dictData) => {
          resolve(dictData);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

function compileDict(list: OriginDictData[], labelFields: DictKeys, valueFields: DictKeys): DictData[] {
  return list.map(e => convertDict(e, labelFields, valueFields));
}

function convertDict(data: OriginDictData, labelFields: DictKeys, valueFields: DictKeys) {
  const res = { raw: data } as unknown as DictData;
  const labelField = getDictField(data, ...labelFields);
  const valueField = getDictField(data, ...valueFields);
  res.label = data[labelField] as string;
  res.value = data[valueField] as string;
  return res;
}

function getDictField(dict: Partial<OriginDictData>, ...fields: Array<keyof OriginDictData>) {
  const res = fields.find(f => Object.prototype.hasOwnProperty.call(dict, f)) as keyof OriginDictData;
  if (!res)
    console.warn(`[Dict get field error]: Object cannot find key \`${fields.join(',')}\` in `, dict);

  return res;
}

