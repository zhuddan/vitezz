import type { AssembleComponent, WithOption } from '../../util';
interface OptionProps {
  leaf: boolean;
}

export type CascaderOption = WithOption<OptionProps>;
interface CascaderPropsConfig {
  // 次级菜单的展开方式
  expandTrigger: 'click' | 'hover';
  // 是否多选
  multiple: boolean;
  // 是否严格的遵守父子节点不互相关联
  checkStrictly: boolean;
  // 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
  emitPath: boolean;
  // 是否动态加载子节点，需与 lazyLoad 方法结合使用
  lazy: boolean;
  // 加载动态数据的方法，仅在 lazy 为 true 时有效
  lazyLoad(n: Node, resolve: Fn): void;
  /**
   * @description 指定选项的值为选项对象的某个属性值
   * @default 'value'
   */
  value: string;

  /**
   * @description 指定选项标签为选项对象的某个属性值
   * @default 'label'
   */
  label: string;

  /**
   * @description 指定选项的子选项为选项对象的某个属性值
   * @default 'children'
   */
  children: string;

  /**
   * @description 指定选项的禁用为选项对象的某个属性值
   * @default 'disabled'
   */
  disabled: string;

  /**
   * @description 指定选项的叶子节点的标志位为选项对象的某个属性值
   * @default 'leaf'
   */
  leaf: string;
}
// 类型
export interface CascaderProps {

  // 配置选项
  props: CascaderPropsConfig;
  // 输入框占位文本
  placeholder: string;
  //  是否显示清除按钮
  clearable: boolean;
  // 输入框中是否显示选中值的完整路径
  showAllLevels: boolean;
  // 多选模式下是否折叠Tag
  collapseTags: boolean;
  // 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true
  collapseTagsTooltip: boolean;
  // 用于分隔选项的字符
  separator: string;
  // 该选项是否可以被搜索
  filterable: boolean;
  // 自定义搜索逻辑，第一个参数是node，第二个参数是keyword，返回的布尔值表示是否保留该选项
  filterMethod(n: Node, keyword: string): boolean;
  // 搜索关键词正在输入时的去抖延迟，单位为毫秒 (300)
  debounce: number;
  // 过滤函数调用前，所要调用的钩子函数，该函数接收要过滤的值作为参数。 如果该函数的返回值是 false 或者是一个被拒绝的 Promise，那么接下来的过滤逻辑便不会执行。
  beforeFilter(v: string): any;
  // 下拉框的类名
  popperClass: string;
  // 弹层是否使用 teleport
  teleported: boolean;
  // 标签类型
  tagType: 'success' | 'info' | 'warning' | 'danger';
  // 输入时是否触发表单的校验
  validateEvent: boolean;
  // options
  options: TreeList<CascaderOption>;
}

export interface CascaderEvent {
  onChange: Fn<any>;
  onBlur: Fn;
  onFocus: Fn;
  onExpandChange: Fn;
  onVisibleChange: Fn;
  // 	在多选模式下，移除Tag时触发
  onRemoveChange: Fn;
}

export type Cascader = AssembleComponent<'Cascader', CascaderProps, CascaderEvent>;