export enum ENVS {
  PROD = "production",
  DEV = "development",
  DEV_LOCAL = "developmentLocal",
}

export interface Env {
  ENV: ENVS;
}
