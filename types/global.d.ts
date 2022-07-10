import type { PropType as VuePropType } from 'vue';

declare global {
  declare interface VEvent extends Event {
    target: HTMLInputElement;
  }

  declare type PropType<T> = VuePropType<T>;

  declare type IntervalHandle = ReturnType<typeof setInterval>;

  declare type TimeoutHandle = ReturnType<typeof setTimeout>;

  declare interface Fn<T = any, R = T> {
    (...arg: T[]): R;
  }

  declare interface PromiseFn<T = any, R = T> {
    (...arg: T[]): Promise<R>;
  }

  declare type Nullable<T> = T | null;

  declare type Recordable<T = any> = Record<string, T>;

  declare type TreeItem<T> = T & {
    children?: TreeItem<T>[];
  };

  declare type TreeList<T> = TreeItem<T>[];

  type callback = Fn<DOMHighResTimeStamp, void>;

  interface Window {
    webkitRequestAnimationFrame: Fn<FrameRequestCallback, number>;
    mozRequestAnimationFrame: Fn<FrameRequestCallback, number>;
  }

  // 当前系统所有可以登录的角色类型
  type RoleItem = 'company' | 'yuanqu';

  declare type TargetContext = '_self' | '_blank';
}
