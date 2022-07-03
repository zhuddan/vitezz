export type Settings = Pick<
  ImportMetaEnv,
  | 'VITE_APP_PORT'
  | 'VITE_APP_TITLE'
  | 'VITE_APP_GEO_SERVER_URL'
  | 'VITE_APP_ONLY_OFFICE_URL'
  | 'VITE_APP_BASE_API'
  | 'MODE'
  | 'PROD'
  | 'VITE_APP_PREFIX'
>;

export function useSettings(): Settings {
  const {
    VITE_APP_PORT,
    VITE_APP_TITLE,
    VITE_APP_GEO_SERVER_URL,
    VITE_APP_ONLY_OFFICE_URL,
    VITE_APP_BASE_API,
    MODE,
    PROD,
    VITE_APP_PREFIX,
  } = import.meta.env;
  return {
    VITE_APP_PORT,
    VITE_APP_TITLE,
    VITE_APP_GEO_SERVER_URL,
    VITE_APP_ONLY_OFFICE_URL,
    VITE_APP_BASE_API,
    MODE,
    PROD,
    VITE_APP_PREFIX,
  };
}
