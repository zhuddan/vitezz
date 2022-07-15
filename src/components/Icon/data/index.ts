export { default as AntdIcons } from './icons.ant-design';
export { default as EpIcons } from './icons.ep';

export type IconsType = 'ant-design' | 'element-plus';
export interface IconsJson {
  prefix: string;
  icons: string[];
}
export type IC = Record<IconsType, IconsJson>;

// export const IconCollections: IC = {
//   'element-plus': EpIcons,
// };
