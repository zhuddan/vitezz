import { defHttp } from '@/utils/http';
import { merge } from 'lodash-es';
import type { Ref } from 'vue';
import type { DictData, DictKeys, DictValues, MaybeRef, OriginDictData } from './typings';

export interface DictBaseOptions {
  labelFields: DictKeys;
  valueFields: DictKeys;
  isLazy: boolean;
}
export interface FormatDictOptions {
  symbol?: string;
  isRaw?: boolean;
}

const defaultRuoyiDictsOptions: DictBaseOptions = {
  labelFields: ['label', 'dictLabel', 'name', 'title'],
  valueFields: ['value', 'dictValue', 'code', 'key'],
  isLazy: false,
};

const defaultFormatDictOptions: Required<FormatDictOptions> = {
  symbol: '/',
  isRaw: false,
};

function getDicts<DT extends string = string>(dictType: DT) {
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
export class DictBase {
  options: DictBaseOptions;

  get labelFields() {
    return this.options.labelFields;
  }

  get valueFields() {
    return this.options.valueFields;
  }

  getField(dict: Partial<OriginDictData>, ...fields: Array<keyof OriginDictData>) {
    const res = fields.find(f => Object.prototype.hasOwnProperty.call(dict, f)) as keyof OriginDictData;
    if (!res)
      console.warn(`[Dict get field error]: Object cannot find key \`${fields.join(',')}\` in `, dict);

    return res;
  }

  constructor(options: Partial<DictBaseOptions> = {}) {
    this.options = merge(defaultRuoyiDictsOptions, options);
  }
}

export class Dict<DT extends string = string> extends DictBase {
  dictTypes: DT[];
  dictMeta = {} as Record<DT, DictMeta>;
  _data = reactive<DictValues<DT>>({} as DictValues<DT>);

  get data() {
    return computed(() => {
      for (const _key in this.dictMeta) {
        const key = _key as DT;
        if (Object.prototype.hasOwnProperty.call(this.dictMeta, key))
          this._data[key] = this.dictMeta[key].data as any;
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

  load(): void;
  load(...args: DT[]): void;
  load(...args: DT[]) {
    const loadList = args.length ? args : this.dictTypes;
    return Promise.all(loadList.map((dt) => {
      return this.dictMeta[dt]?.load();
    }));
  }

  format(dOt: DT | MaybeRef<DictData[]>, val: string[], opt: { isRaw: true; symbol?: string }): DictData[];
  format(dOt: DT | MaybeRef<DictData[]>, val: string, opt: { isRaw: true; symbol?: string }): DictData;
  format(dOt: DT | MaybeRef<DictData[]>, val: string | string[], opt?: { isRaw?: false; symbol?: string }): string;
  format(dOt: DT | MaybeRef<DictData[]>, val: string | string[], opt: FormatDictOptions = {}) {
    const formatResult = computed(() => {
      // 当前需要翻译的字典数据 (如果 dictDataOrType 是 DT 则通过 this.dictMeta[dictDataOrType].data 获取)
      const dictDataList = typeof dOt == 'string' ? unref(this.dictMeta[dOt].data) : unref(dOt);
      // 处理参数
      const formatOptions: Required<FormatDictOptions> = merge(defaultFormatDictOptions, opt);
      // 把需要翻译的值处理为数据方便操作
      const values = val instanceof Array ? val : [val];
      // debug
      const legalValues = dictDataList.map(e => e.value);
      // 遍历 values 进行翻译
      const dictDataResult = values.map((e) => {
        // 因为 Dict 实例化 dictMeta 已经把 labelFields valueFields 封装给了 dictMeta.data
        // 所以直接取 dictMeta.data[].value(下面.label同理)
        const dictDataItem = dictDataList.find(item => item?.value == e) || null;
        if (dictDataItem == null && legalValues.length)
          console.warn(legalValues);

        return dictDataItem as DictData;
      });

      if (formatOptions.isRaw)
        // 如果 format(dictKey, '1', { isRaw: true }) 则返回第一项( dictDataResult[0] 而不是 dictDataResult)
        return typeof val == 'string' ? dictDataResult[0] : dictDataResult;
      return dictDataResult.map(e => e?.label).join(formatOptions.symbol);
    });
    return unref(formatResult);
  }
}

export class DictMeta<DT extends string = string> extends DictBase {
  dictType: DT;
  data: Ref<DictData[]> = ref([]);

  constructor(dictType: DT, options: Partial<DictBaseOptions> = {}) {
    super(options);
    this.dictType = dictType;
    this.init();
  }

  init() {
    console.log(this.options.isLazy);
    if (!this.options.isLazy) this.load();
  }

  async load() {
    return this.data.value = await this.requestDicts();
  }

  private requestDicts(): Promise<DictData[]> {
    return new Promise((resolve, reject) => {
      return getDicts(this.dictType)
        .then((res) => {
          return this.compileDict(res.data);
        })
        .then((dictData) => {
          resolve(dictData);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  compileDict(list: OriginDictData[]): DictData[] {
    return list.map((data) => {
      const res = { raw: data } as unknown as DictData;
      const labelField = this.getField(data, ...this.labelFields);
      const valueField = this.getField(data, ...this.valueFields);
      res.label = data[labelField] as string;
      res.value = data[valueField] as string;
      return res;
    });
  }
}
