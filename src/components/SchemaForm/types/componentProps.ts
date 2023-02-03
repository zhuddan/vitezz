import type { Component } from 'vue';

export type ComponentType =
  | 'Input'
  | 'InputNumber'
  | 'Select'
  | 'RadioGroup'
  | 'CheckboxGroup'
  | 'Cascader'
  | 'DatePicker'
  | 'TimePicker'
  | 'TimeSelect'
  | 'Switch'
  | 'Upload'
  | 'Slider'
  | 'Rate'
  | 'Divider'
  | 'ColorPicker';

export type SizeType = 'large' | 'default' | 'small';
type DateType =
  | 'year'
  | 'month'
  | 'date'
  | 'dates'
  | 'datetime'
  | 'week'
  | 'datetimerange'
  | 'daterange'
  | 'monthrange'
  | 'date';
type FormatType = string | 'YYYY' | 'YYYY-MM' | 'YYYY-MM-DD' | 'HH:mm:ss';
type ValueFormatType = string | 'YYYY' | 'YYYY-MM' | 'YYYY-MM-DD' | 'HH:mm:ss';

export interface InputType {
  // 最大输入长度
  maxlength: number | string;
  // 	原生属性，最小输入长度
  minlength: number;
  // 是否显示输入字数统计
  showWordLimit: boolean;
  // 输入框占位文本
  placeholder: string;
  // 是否可清空
  clearable: boolean;
  // 是否显示切换密码图标
  showPassword: boolean;
  // 是否禁用
  disabled: boolean;
  // 输入框尺寸
  size: SizeType;
  // 自定义前缀图标
  prefixIcon: any;
  // 自定义后缀图标
  suffixIcon: any;
  // 	输入框行数，只对 type="textarea" 有效
  rows: number;
  // textarea高度是否自适应，只在 type="textarea" 时生效。
  autosize: number | { minRows?: number; maxRows?: number };
  // 原生属性，自动补全
  autocomplete: boolean;
  // 原生属性
  name: string;
  //  原生属性，是否只读
  readonly: boolean;
  // 原生属性，
  max: number;
  // 原生属性
  min: number;
  // 原生属性，
  step: number;
  // 控制是否能被用户缩放
  resize: 'none' | 'both' | 'horizontal' | 'vertical';
  // 原生属性，
  autofocus: boolean;
  // 原生属性
  form: string;
  // 输入框关联的 label 文字
  label: string;
  // 输入框的 tabindex
  tabindex: string | number;
  // 输入时是否触发表单的校验
  validateEvent: boolean;
  // input 元素或 textarea 元素的 style	object
  inputStyle: Recordable;
}

export interface InputNumber {
  // 是否只能输入 step 的倍数
  stepStrictly: boolean;
  // 数值精度
  precision: number;
  // 是否使用控制按钮
  controls: Boolean;
  // 控制按钮位置
  controlsPosition: 'right' | 'left';
}

export interface RadioGroup {
  // 按钮形式的 Radio 激活时的填充色和边框色
  fill: string;
}

export interface RateType {
  // 是否允许半选
  allowHalf: boolean;
  // 低分和中等分数的界限值， 值本身被划分在低分中 默认值 2
  lowThreshold: number;
  // 高分和中等分数的界限值， 值本身被划分在高分中 默认值 4
  highThreshold: number;
  // icon 的颜色。 若传入数组，共有 3 个元素，为 3 个分段所对应的颜色；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的颜色 默认值  ['#F7BA2A' , '#F7BA2A' , '#F7BA2A']
  colors: Array<string>;
  // 未选中 icon 的颜色 默认值:#C6D1DE
  voidColor: string;
  // 只读时未选中 icon 的颜色  默认值:#EFF2F7
  disabledVoidColor: string;
  // 图标组件 若传入数组，共有 3 个元素，为 3 个分段所对应的类名；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的类名
  icons: Array<string | Component>;
  // 	未被选中的图标组件
  voidIcon: string | Component;
  // 禁用状态的未选择图标
  disabledVoidIcon: string | Component;
  // 是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容
  showText: boolean;
  // 是否显示当前分数， 是否显示当前分数， show-score 和 show-text 不能同时为真
  showScore: boolean;
  // 辅助文字的颜色
  textColor: string;
  // 	辅助文字数组
  texts: string[];
  // 分数显示模板
  scoreTemplate: string;
}

export interface SelectType {
  // 是否多选
  multiple: boolean;
  // 作为 value 唯一标识的键名，绑定值为对象类型时必填
  valueKey: string;
  // 折叠多选
  collapseTags: boolean;
  // 多选限制 0
  multipleLimit: number;
  // 主题
  effect: 'dark' | 'light';
  // 搜索
  filterable: boolean;
  filterMethod: Fn;
  // 是否创建新的选项
  allowCreate: boolean;
  // 是否远程搜索
  remote: boolean;
  remoteMethod: Fn;
  loading: boolean;
  loadingText: string;
  noMatchText: string;
  noDataText: string;
  // Select下拉列表的自定义类名
  popperClass: string;
  // 当multiple 和 filter为true时，选择选项后是否保留当前关键字
  reserveKeyword: boolean;
  // 在回车键上选择第一个匹配选项。与可过滤或远程设备一起使用
  defaultFirstOption: boolean;
  // 是否将popper菜单附加到body。如果提升器的位置错误，可以尝试将此选项设置为false
  popperAppendToBody: boolean;
  // 选择下拉菜单是否传送到body
  teleported: boolean;
  // 当select dropdown处于非活动状态且persistent为false时，select dropdown将被销毁
  persistent: boolean;
  // 对于不可过滤的选择，该道具决定输入聚焦时是否弹出选项菜单
  automaticDropdown: boolean;
  // 清除按钮图标
  clearIcon: string | Component;
  // 下拉列表的宽度是否与输入相同
  fitInputWidth: boolean;
  // 自定义后缀图标组件
  suffixIcon: string | Component;
  // tag-type
  tagType: 'success' | 'info' | 'warning' | 'danger';
}

export interface SliderType {
  // 是否显示间断点;
  showStops: boolean;
  // 是否显示提示信息	boolean	—	true
  showTooltip: boolean;
  // 格式化提示信息
  formatTooltip: Fn;
  // 是否开启选择范围	boolean	—	false
  range: boolean;
  // 垂直模式	boolean	—	false
  vertical: boolean;
  // 滑块高度，垂直模式必填	string	—	—
  height: string;
  // 屏幕阅读器标签	string	—	—
  label: string;
  // 输入防抖延迟，单位毫秒，仅在 show-input 为 true 时生效	number	—	300
  debounce: number;
  // tooltip 的自定义类名
  tooltipClass: string;
  // 标记， 对象的键类型需为 number 且对象的值必须在 [min, max]闭区间内，每个标记均可自定义样式
  marks: Object;
}

export interface Switch {
  // switch 状态为 on 时所显示图标，设置此项会忽略 active-text
  activeIcon: string | Component;
  //	switch 状态为 off 时所显示图标，设置此项会忽略 inactive-text
  inactiveIcon: string | Component;
  //	switch 打开时的文字描述
  activeText: string;
  //	switch 的状态为 off 时的文字描述
  inactiveText: string;
  //	switch 状态为 on 时的值 默认值 true
  activeValue: boolean | string | number;
  //	switch的状态为 off 时的值 默认值 false
  inactiveValue: boolean | string | number;
  //	switch的值为 on 时的颜色	默认值	#409EFF
  activeColor: string;
  //	switch的值为 off 的颜色	默认值	#C0CCDA
  inactiveColor: string;
  //	switch 边框颜色	默认值
  borderColor: string;
  //   switch 对应的 name 属性	string	—	—
  name: string;
  // 改变 switch 状态时是否触发表单的校验	boolean	—	true
  validateEvent: string;
  //	switch 状态改变前的钩子， 返回 false 或者返回 Promise 且被 reject 则停止切换	function	—	—
  beforeChange: Fn | PromiseFn;
}

export interface DatePikerType {
  //	文本框可输入	boolean	—	true
  editable: boolean;
  //	范围选择时开始日期的占位内容
  startPlaceholder: boolean;
  //	范围选择时结束日期的占位内容
  endPlaceholder: boolean;
  //	显示类型	string
  type: DateType;
  //	显示在输入框中的格式
  format: FormatType;
  //	DatePicker
  popperClass: string;
  //	选择范围时的分隔符
  rangeSeparator: string;
  //	可选，选择器打开时默认显示的时间
  defaultValue: Date | string;
  //	范围选择时选中日期所使用的当日内具体时刻	Date[]	长度为2的数组，每一项都是Date对象。 第一项是起始日期，第二项是终止日期	—
  defaultTime: Date[];
  //	可选，绑定值的格式。 不指定则绑定值为 Date 对象	string	请查阅 date formats	—
  valueFormat: ValueFormatType | ValueFormatType[];
  //	等价于原生 id 属性	string / array(string)	字符串 id="my-date" 对应单个日期或数组 :id="['my-range-start', 'my-range-end']" 对应日期范围	-
  id: boolean;
  //	在范围选择器里取消两个日期面板之间的联动
  unlinkPanels: boolean;
  //	输入时是否触发表单的校验
  validateEvent: boolean;
  // 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。	function	—	—
  disabledDate: Fn<Date>;
  // 设置快捷选项，需要传入数组对象	object[{ text: string, value: date / function }]	—	—
  shortcuts: Object;
  // set custom className	Function(Date)	—	—
  cellClassName: Fn<Date>;
  //	whether date-picker dropdown is teleported to the body
  teleported: boolean;
}

export interface TimerType {
  //	范围选择时开始日期的占位内容
  startPlaceholder: string;
  //	范围选择时结束日期的占位内容
  endPlaceholder: string;
  //	是否为时间范围选择
  isRange: boolean;
  //	是否使用箭头进行时间选择
  arrowControl: boolean;
  //	对齐方式
  align: 'left' | 'center' | 'right';
  //	TimePicker 下拉框的类名
  popperClass: string;
  //	选择范围时的分隔符
  rangeSeparator: string;
  // 可选，选择器打开时默认显示的时间	Date(TimePicker) / string(TimeSelect)	可被new Date()解析(TimePicker) / 可选值(TimeSelect)	—
  defaultValue: string | Date;
  //	等价于原生 input id 属性	string / array(string)	字符串 id="my-time" range 模式 数组 :id="['my-range-start', 'my-range-end']"	-
  //	禁止选择部分小时选项
  disabledHours: Fn;
  //	禁止选择部分分钟选项
  disabledMinutes: Fn;
  //	禁止选择部分秒选项
  disabledSeconds: Fn;
  // 开始时间	string	—	09:00
  start: string;
  // 结束时间	string	—	18:00
  end: string;
  // 间隔时间	string	—	00:30
  step: string;
  // 最早时间点，早于该时间的时间段将被禁用	string	—	00:00
  minTime: string;
  // 最晚时间点，晚于该时间的时间段将被禁用	string	—	—
  maxTime: string;
}

export interface CascaderType {
  // 用于分隔选项的字符
  separator: string;
  props: {
    // 次级菜单的展开方式
    expandTrigger: 'click' | 'hover';
    //      是否多选	boolean	-	false
    multiple: boolean;
    //	是否严格的遵守父子节点不互相关联
    checkStrictly: boolean;
    //	在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
    emitPath: boolean;
    //	是否动态加载子节点，需与 lazyLoad 方法结合使用
    lazy: boolean;
    //	加载动态数据的方法，仅在 lazy 为 true 时有效	function(node, resolve)，node为当前点击的节点，resolve为数据加载完成的回调(必须调用)	-	-
    lazyLoad: Fn;
    //	指定选项的值为选项对象的某个属性值
    value: string;
    //	指定选项标签为选项对象的某个属性值
    label: string;
    //	指定选项的子选项为选项对象的某个属性值
    children: string;
    //	指定选项的禁用为选项对象的某个属性值
    disabled: string;
    //	指定选项的叶子节点的标志位为选项对象的某个属性值
    leaf: string;
  };
}

export interface CompEvents {
  onBlur: Fn;
  onFocus: Fn;
  onChange: Fn;
  onInput: Fn;
  onClear: Fn;
  onVisibleChange: Fn;
  // 多选模式下移除tag时触发
  removeRag: Fn;
  // 下拉框出现/隐藏时触发
  visibleChange: Fn;
  // 如果用户没有选择日期，那默认展示当前日的月份。 你可以使用 default-value 来设置成其他的日期。
  calendarChange: Fn;
  //    当日期面板改变时触发。	(date, mode, view)
  panelChange: Fn;
}
export type RadioType = 'Radio' | 'RadioButton';
export type CheckboxType = 'Checkbox' | 'CheckboxButton';
// export interface CompOptionType {
//   label: string | number;
//   value: string | number;
//   [key: string]: any;
// }

export interface Options {
  value: any;
  label: string | number;
  disabled?: boolean;
}

// TreeList for cascader
export type WithOptions<T> = T & { options: MaybeRef<Options[] | TreeList<Options>> };

export interface WithComponentType<C extends ComponentType, T> {
  component: C;
  // 子组件 属性
  componentProps?: T;
}

export type AllComponentProps = WithComponentType<'Input', InputType> | WithComponentType<'RadioGroup', RadioGroup>;

// const _allComponentProps: AllComponentProps = {
//   component: 'Input',
//   componentProps: {
//     fill: '',
//   },
// };
// _allComponentProps;
export type ComponentProps = Partial<WithOptions<
  | InputType
  | InputNumber
  | RadioGroup
  | RateType
  | SelectType
  | SliderType
  | Switch
  | DatePikerType
  | TimerType
  | CascaderType
  | CompEvents
>>;
