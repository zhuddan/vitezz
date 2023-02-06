import type { FormAction } from './action';
import type { ComponentType, SizeType, StyleType } from './common';

export interface CommonProps {
  disabled: boolean;
  style: StyleType;
  size: SizeType;
}

export interface WithOption<OptionsProps extends object = object> {
  value: any;
  label: string | number;
  disabled?: boolean;
  optionProps?: Partial<OptionsProps>;
}

export interface AssembleComponent<CN extends ComponentType, CP extends object, EV extends object, D extends object = any> {
  component: CN;
  componentProps?: MaybeRecordRef<Partial<CP & EV & CommonProps>> | ((formModel: D, formAction: FormAction) => MaybeRecordRef<Partial<CP & EV & CommonProps>>)
  ;
}