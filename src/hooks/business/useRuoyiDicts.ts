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

export function useRuoyiDicts<DT extends string = DictTypes>(dts: DT[]) {
  const dict = new Dict<DT>(dts);

  const res = {
    dict,
    d: toRefs(dict.data.value),
  };

  console.log(res);
  // return res as unknown as {
  //   [key in DT]: DictData;
  // } & {
  //   dict: Dict<DT>;
  // };
}