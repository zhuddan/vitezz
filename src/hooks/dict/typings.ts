export type DICT_TYPE = 'sys_job_group' | 'sys_job_status';

export interface OriginDictData {
  id: string;
  dictValue: string;
  value: string;
  // other value
  code: string;
  key: string;

  dictLabel: string;
  label: string;
  // other label
  name: string;
  title: string;
}

export interface DictData {
  value: string;
  label: string;
  raw: Partial<OriginDictData>;
}

export type DictValues<T extends string> = {
  [key in T]: DictData[];
};

export type DICT_DATA_KEY = Array<keyof OriginDictData>;

export interface FormatDictOptions {
  separator: string;
}

export interface DictOptions {
  isLazy: boolean;
  labelFields: DICT_DATA_KEY;
  valueFields: DICT_DATA_KEY;
}
