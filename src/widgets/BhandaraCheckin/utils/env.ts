import { Env } from "widgets/BhandaraCheckin/types";

export const getEnv = (): Env => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    EMULATOR: String(process.env.REACT_APP_EMULATOR) === "true",
    DASHBOARD_PASSWORD: process.env.REACT_APP_DASHBOARD_PASSWORD as string,
    FIREBASE: JSON.parse(process.env.REACT_APP_FIREBASE as string),
  };
};
