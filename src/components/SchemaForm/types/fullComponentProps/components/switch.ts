import type { AssembleComponent, IconType } from '../../util';

// 类型
export interface SwitchProps {
  // 是否显示加载中
  loading: boolean;
  // switch 的宽度
  width: boolean | number;
  // 无论图标或文本是否显示在点内，只会呈现文本的第一个字符
  inlinePrompt: boolean;
  // switch 状态为 on 时所显示图标，设置此项会忽略 active-text
  activeIcon: IconType;
  // switch 状态为 off 时所显示图标，设置此项会忽略 inactive-text
  inactiveIcon: IconType;
  // switch 打开时的文字描述
  activeText: string;
  // 	switch 的状态为 off 时的文字描述
  inactiveText: string;
  // switch 状态为 on 时的值
  activeValue: boolean | string | number;
  // switch的状态为 off 时的值
  inactiveValue: boolean | string | number;
  // active-color 当在 on 状态时的背景颜色(已废弃，请使用 CSS var --el-switch-on-color )
  // inactive-color off 状态时的背景颜色(已废弃，使用 CSS var --el-switch-of-color )
  // border-color 开关的边框颜色 ( 已废弃，使用 CSS var --el-switch-border-color )
  // switch 对应的 name 属性
  name: string;
  // 输入时是否触发表单的校验
  validateEvent: boolean;
  // switch 状态改变前的钩子， 返回 false 或者返回 Promise 且被 reject 则停止切换
  beforeChange: () => Promise<boolean> | boolean;
}
// CSSProperties
export interface SwitchEvent {
  onChange: Fn;
}

export type Switch<T extends object> = AssembleComponent<'Switch', SwitchProps, SwitchEvent, T>;