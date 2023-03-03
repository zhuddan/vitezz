import { WebCache } from '@zdzz/shared';
import { name as projectName, version as projectVersion } from '../../../package.json';

type WebCacheKey = 'TOKEN' | 'APP_COLLAPSE';
export const webCache = new WebCache<WebCacheKey>({
  projectName,
  projectVersion,
});
