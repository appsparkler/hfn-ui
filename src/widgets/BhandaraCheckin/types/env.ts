export enum ENVS {
  PROD = "production",
  DEV = "development",
  DEV_LOCAL = "developmentLocal",
}

export interface Env {
  ENV?: ENVS;
  DASHBOARD_PASSWORD?: string;
  FIREBASE: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  };
}
