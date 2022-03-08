import { bool, cleanEnv, str } from 'envalid';


export enum AppEnvEnum {
  LOCAL = 'local',
  SIT = 'sit',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TEST = 'test'
}

export interface AppConfigInterface {
  APP_ENV: AppEnvEnum | string | 'local' | 'sit' | 'staging' | 'production';
  APP_NAME: string;
}

export const configApp = cleanEnv<AppConfigInterface>(process.env, {
  APP_ENV: str({ choices: Object.values(AppEnvEnum) }),
  APP_NAME: str(),
});

/**
 * Validate environment is updated
 * @returns
 */
export const validateConfigApp = () => configApp;
