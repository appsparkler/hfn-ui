export type Environments = "development" | "production" | "test";

export interface Env {
  NODE_ENV: Environments;
  EMULATOR: boolean;
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
