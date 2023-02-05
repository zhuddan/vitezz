import type { Ref, PropType as VuePropType } from 'vue';

declare global {
  // window
  interface Window {
    webkitRequestAnimationFrame: Fn<FrameRequestCallback, number>;
    mozRequestAnimationFrame: Fn<FrameRequestCallback, number>;
    process: any;
  }

  declare type TargetContext = '_self' | '_blank';

  declare interface VEvent extends Event {
    target: HTMLInputElement;
  }

  declare type IntervalHandle = ReturnType<typeof setInterval>;

  declare type TimeoutHandle = ReturnType<typeof setTimeout>;

  // vue
  declare type PropType<T> = VuePropType<T>;

  declare type EmitType = (event: string, ...args: any[]) => void;

  declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

  declare type MaybeRef<T> = T | Ref<T> ;

  declare type MaybeRecordRef<T> = {
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

  declare type Nullable<T> = T | null;

  declare type Arrayable<T> = T | T[];

  declare type Awaitable<T> = Promise<T> | T;

  declare type Recordable<T = any> = Record<string, T>;

}
