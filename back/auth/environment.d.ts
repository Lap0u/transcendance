/* eslint-disable prettier/prettier */
declare namespace NodeJS {
  export interface ProcessEnv {
    POSTGRES_HOST?: string;
    POSTGRES_PORT?: string;
    POSTGRES_USER?: string;
    POTRGRES_DB_PASS?: string;
    POSTGRES_NAME?: string;
    PORT?: string;
	ENVIRONMENT: Environment;
	CLIENT_42_UUID?: string;
	CLIENT_42_SECRET?: string;
	CLIENT_42_CALLBACK?: string;
  }
  export type Environment = 'DEVELOPMENT' | 'PRODUCTION' | 'TEST';
}
