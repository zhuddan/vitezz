import type { CSSProperties } from 'vue';
import type { AssembleComponent, IconType } from '../../util';

// 类型
export interface DividerProps {
  direction: 'horizontal' | 'vertical';
  border: CSSProperties['border'];
  contentPosition: string;
  content: IconType;
}

export interface DividerEvent {

}

export type Divider<T extends object> = AssembleComponent<'Divider', DividerProps, DividerEvent, T>;