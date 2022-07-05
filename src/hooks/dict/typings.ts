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

export type DictMap<T extends string, P> = {
  [key in T]: P;
};

export type DictValues<T extends string> = DictMap<T, DictData[]>;

export type DictStateItem = 'pending' | 'fulfilled' | 'rejected';

interface State {
  loading: 'pending' | 'fulfilled' | 'rejected';
  time: number;
}

export type DictState<T extends string> = DictMap<T, State>;

export type DictDataKey = Array<keyof OriginDictData>;

export interface FormatDictOptions {
  separator: string;
}

export interface DictOptions {
  isLazy: boolean;
  labelFields: DictDataKey;
  valueFields: DictDataKey;
  retryTime: number;
  retryTimeout: number;
}
