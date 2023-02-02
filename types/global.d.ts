import type { Ref, PropType as VuePropType } from 'vue';

declare global {
  // window
  interface Window {
    webkitRequestAnimationFrame: Fn<FrameRequestCallback, number>;
    mozRequestAnimationFrame: Fn<FrameRequestCallback, number>;
    process: any;
  }

  declare interface VEvent extends Event {
    target: HTMLInputElement;
  }

  declare type IntervalHandle = ReturnType<typeof setInterval>;

  declare type TimeoutHandle = ReturnType<typeof setTimeout>;

  // vue
  declare type PropType<T> = VuePropType<T>;

  declare type MaybeRef<T> = T | Ref<T> ;

  declare type MaybeRefRecordWrap<T> = {
    [P in keyof T]: MaybeRef<T[P]>;
  };

  // common

  declare interface Fn<T = any, R = T> {
    (...arg: T[]): R;
  }

  declare interface PromiseFn<T = any, R = T> {
    (...arg: T[]): Promise<R>;
  }

  // business
  declare type TreeItem<T> = T & {
    children?: TreeItem<T>[];
  };

  declare type TreeList<T> = TreeItem<T>[];

  type callback = Fn<DOMHighResTimeStamp, void>;

  declare type TargetContext = '_self' | '_blank';

  declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

  declare type Nullable<T> = T | null;

  declare type Arrayable<T> = T | T[];

  declare type Recordable<T = any> = Record<string, T>;

}
