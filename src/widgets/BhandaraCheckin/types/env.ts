export interface Env {
  NODE_ENV: "development" | "production" | "test";
  DASHBOARD_PASSWORD?: string;
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
