import type { Ref } from 'vue';
import type { DictData, DictDataListRecord } from './typings';
import type { DictBaseOptions } from './RuoyiDicts';
import { Dict } from './RuoyiDicts';

export type DictTypes =
| 'sys_user_sex' // 用户性别
| 'sys_show_hide' // 菜单状态
| 'sys_normal_disable' // 系统开关
| 'sys_job_status' // 任务状态
| 'sys_job_group' // 任务分组
| 'sys_yes_no' // 系统是否
| 'sys_notice_type' // 通知类型
| 'sys_notice_status' // 通知状态
| 'sys_oper_type' // 操作类型
| 'sys_common_status'; // 系统状态

export function useRuoyiDicts<DT extends DictTypes = DictTypes>(dts: DT[], options: Partial<DictBaseOptions> = {}) {
  const dict = new Dict<DT>(dts, options);
  // debug
  Dict.debug = true;

  const format = dict.format.bind(dict);
  const load = dict.load.bind(dict);

  const dicts = computed (() => dict.data.value);
  const useRuoyiDictsReturn = {
    format,
    load,
    dicts,
    ...toRefs(dict.data.value),
  };

  type UseRuoyiDictsReturn = {
    [key in DT]: Ref<DictData[]>
  } & {
    dicts: DictDataListRecord<DT>;
    format: typeof format;
    load: typeof load;
  };
  return useRuoyiDictsReturn as unknown as UseRuoyiDictsReturn;
}