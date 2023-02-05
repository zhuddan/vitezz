import type { AssembleComponent } from '../../util';

export interface ColorPickerProps {
  // 是否支持透明度选择
  showAlpha: boolean;
  // 写入 v-model 的颜色的格式
  // 'hsl' | 'hsv' | 'hex' | 'rgb' | 'hex' (when show-alpha is false) | 'rgb' (when show-alpha is true)
  colorFormat: 'hsl' | 'hsv' | 'hex' | 'rgb' | 'hex';
  // 下拉框的类名
  popperClass: string;
  // 预定义颜色
  predefine: string[];
  // 输入时是否触发表单的校验
  validateEvent: boolean;
  tabindex: number | string;
  // aria-label
  label: string;
  //
  id: string;
}

export interface ColorPickerEvent {
  onChange: Fn;
  // 面板中当前显示的颜色发生改变时触发
  onActiveChange: Fn;
}

export type ColorPicker = AssembleComponent<'ColorPicker', ColorPickerProps, ColorPickerEvent>;