import type { Cascader } from './components/cascader';
import type { CheckboxGroup } from './components/checkbox';
import type { ColorPicker } from './components/colorPicker';
import type { DatePicker } from './components/datePicker';
import type { Divider } from './components/divider';
import type { Input } from './components/input';
import type { InputNumber } from './components/inputNumber';
import type { RadioGroup } from './components/radioGroup';
import type { Select } from './components/select';
import type { Slider } from './components/slider';
import type { Switch } from './components/switch';
import type { TimePicker } from './components/timePicker';
import type { TimeSelect } from './components/timeSelect';
import type { Upload } from './components/upload';
import type { ComponentType } from '../util';
import type { Rate } from './components/rate';
export type FullComponentProps<T extends object = any> =
 Input<T>
 | InputNumber<T>
 | RadioGroup<T>
 | CheckboxGroup<T>
 | Select<T>
 | DatePicker<T>
 | Cascader<T>
 | ColorPicker<T>
 | TimePicker<T>
 | TimeSelect<T>
 | Switch<T>
 | Slider<T>
 | Divider<T>
 | Upload<T>
 | Rate<T>
;

// test
export const d = ref<ComponentType>('Input');
export const ddd: FullComponentProps['component'] = 'TimeSelect';
export const f: FullComponentProps = {
  component: ddd,
  componentProps: {

  },
};