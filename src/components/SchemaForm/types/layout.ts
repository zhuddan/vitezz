type ColSpanType = number;

export interface ColEx {
  span?: ColSpanType;

  offset?: ColSpanType;
  // 栅格向右移动格数
  push?: ColSpanType;
  // 	栅格向左移动格数
  pull?: ColSpanType;

  xs?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  sm?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  md?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  lg?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  xl?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  xxl?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  tag?: string;
}

export interface RolEx {
  // 栅格间隔
  gutter?: number;
  // flex 布局下的水平排列方式
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
  // flex 布局下的垂直排列方式
  align?: 'top' | 'middle' | 'bottom';
  // 自定义元素标签
  tag?: string;
}