import type { AssembleComponent, IconType } from '../../util';

// 类型
export interface RateProps {
  // 最大分值
  max: number;
  // 是否允许半选
  allowHalf: boolean;
  //  低分和中等分数的界限值， 值本身被划分在低分中 2
  lowThreshold: number;
  // 高分和中等分数的界限值， 值本身被划分在高分中 4
  highThreshold: number;
  // icon 的颜色。 若传入数组，共有 3 个元素，为 3 个分段所对应的颜色；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的颜色
  colors: Array<string> | object;
  // 未选中 icon 的颜色
  voidColor: string;
  // 只读时未选中 icon 的颜色
  disabledVoidColor: string;
  // 图标组件 若传入数组，则需要传入 3 个元素，分别为 3 个部分所对应的类名；若传入对象，则可自定义分段，键名为分段的界限值，键值为对应的类名
  icons: Array<string> | object;
  // 未被选中的图标组件
  voidIcon: IconType;
  // 禁用状态的未选择图标
  disabledVoidIcon: IconType;
  // 是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容
  showText: boolean;
  // 是否显示当前分数， show-score 和 show-text 不能同时为真
  showScore: boolean;
  // 辅助文字的颜色
  textColor: string;
  // 辅助文字数组
  texts: Array<string>;
  //   分数显示模板
  scoreTemplate: string;
  // 是否可以重置值为 0
  clearable: boolean;
}

export interface RateEvent {
  onChange: Fn;
}

export type Rate<T extends object> = AssembleComponent<'Rate', RateProps, RateEvent, T>;