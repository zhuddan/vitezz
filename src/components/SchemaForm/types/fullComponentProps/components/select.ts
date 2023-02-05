import type { AssembleComponent, Effect, IconType, WithOption } from '../../util';

interface OptionProps {
}

export type SelectOption = WithOption<OptionProps>;

interface SelectProps {
  // 是否多选
  multiple: boolean;
  // 作为 value 唯一标识的键名，绑定值为对象类型时必填
  valueKey: string;

  clearable: boolean;
  // 折叠多选
  collapseTags: boolean;
  // 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true
  collapseTagsTooltip: boolean;
  // multiple 属性设置为 true 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制
  multipleLimit: number;
  // Select 输入框的原生 name 属性
  name: string;
  // 主题
  effect: Effect;
  // Select 输入框的原生 autocomplete 属性
  autocomplete: boolean;
  // 搜索
  filterable: boolean;
  // 是否允许用户创建新条目， 只有当 filterable 设置为 true 时才会生效。
  allowCreate: boolean;
  // 自定义筛选方法
  filterMethod: Fn;
  // 是否远程搜索
  remote: boolean;
  remoteMethod: Fn;
  // 远程搜索方法显示后缀图标
  remoteShowSuffix: boolean;
  // 是否正在从远程获取数据
  loading: boolean;
  // 从服务器加载内容时显示的文本
  loadingText: string;
  // 搜索条件无匹配时显示的文字，也可以使用 empty 插槽设置
  noMatchText: string;
  // 无选项时显示的文字，也可以使用 empty 插槽设置自定义内容
  noDataText: string;
  // Select下拉列表的自定义类名
  popperClass: string;
  // 当multiple 和 filter为true时，选择选项后是否保留当前关键字
  reserveKeyword: boolean;
  // 在回车键上选择第一个匹配选项。与可过滤或远程设备一起使用
  defaultFirstOption: boolean;
  // 是否将popper菜单附加到body。如果提升器的位置错误，可以尝试将此选项设置为false
  /**
   * @deprecated 将于下个版本 1.0.2 被弃用
   */
  popperAppendToBody: boolean;
  // 选择下拉菜单是否传送到body
  teleported: boolean;
  // 当select dropdown处于非活动状态且persistent为false时，select dropdown将被销毁
  persistent: boolean;
  // 对于不可过滤的选择，该道具决定输入聚焦时是否弹出选项菜单
  automaticDropdown: boolean;
  // 清除按钮图标
  clearIcon: IconType;
  // 下拉列表的宽度是否与输入相同
  fitInputWidth: boolean;
  // 自定义后缀图标组件
  suffixIcon: IconType;
  // tag-type
  tagType: 'success' | 'info' | 'warning' | 'danger';
  // 是否触发表单的校验
  validateEvent: boolean;
  // 下拉框出现的位置
  placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';

  options: SelectOption[];

}

interface SelectEvent {
  onChange: Fn;
  onVisibleChange: Fn;
  onRemoveTag: Fn;
  onClear: Fn;
  onBlur: Fn;
  onFocus: Fn;
}

export type Select = AssembleComponent<'Select', SelectProps, SelectEvent>;
