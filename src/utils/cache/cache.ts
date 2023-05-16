import { WebCache } from '@zdzz/shared';
import { name as projectName, version as projectVersion } from '../../../package.json';

export const webCache = new WebCache<{
  TOKEN: string;
  APP_COLLAPSE: boolean;
}>({
  projectName,
  projectVersion,
});
