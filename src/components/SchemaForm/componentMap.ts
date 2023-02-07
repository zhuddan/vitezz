import {
  ElCascader,
  ElColorPicker,
  ElDatePicker,
  ElDivider,
  ElInput,
  ElInputNumber,
  ElRate,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  ElUpload,
} from 'element-plus';
import type { Component } from 'vue';

import SchemaCheckboxGroup from './components/SchemaCheckboxGroup.vue';
import SchemaRadioGroup from './components/SchemaRadioGroup.vue';
import SchemaSelect from './components/SchemaSelect.vue';
import type { ComponentType } from './types/common';

const componentMap = new Map<ComponentType, Component>();

componentMap.set('Input', ElInput);
componentMap.set('InputNumber', ElInputNumber);
componentMap.set('Cascader', ElCascader);
componentMap.set('DatePicker', ElDatePicker);
componentMap.set('TimePicker', ElTimePicker);
componentMap.set('TimeSelect', ElTimeSelect);
componentMap.set('Select', SchemaSelect);
componentMap.set('RadioGroup', SchemaRadioGroup);
componentMap.set('CheckboxGroup', SchemaCheckboxGroup);
componentMap.set('ColorPicker', ElColorPicker);
componentMap.set('Switch', ElSwitch);
componentMap.set('Slider', ElSlider);
componentMap.set('Divider', ElDivider);
componentMap.set('Rate', ElRate);
componentMap.set('Upload', ElUpload);

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };
