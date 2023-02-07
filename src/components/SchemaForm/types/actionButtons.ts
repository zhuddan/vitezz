import type { IconType, SizeType } from './common';
import type { ColEx } from './layout';

export interface ButtonProps {
  size: SizeType;
  type: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  plain: boolean;
  text: boolean;
  bg: boolean;
  link: boolean;
  round: boolean;
  circle: boolean;
  loading: boolean;
  loadingIcon: IconType;
  disabled: boolean;
  icon: IconType;
  autofocus: boolean;
  nativeType: 'button' | 'submit' | 'reset';
  autoInsertSpace: boolean;
  color: string;
  dark: boolean;

  onClick: (e: Partial<FormActionButton>) =>(void | any);
}

export type FormActionButton = {
  colProps?: Partial<ColEx>;
  label: string;
  actionType?: string;
} & Partial<ButtonProps>;
