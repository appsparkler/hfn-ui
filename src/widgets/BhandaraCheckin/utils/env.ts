import { Env, ENVS } from "widgets/BhandaraCheckin/types";

export const getEnv = (): Env => {
  return {
    ENV: process.env.REACT_APP_ENV as ENVS,
    DASHBOARD_PASSWORD: process.env.REACT_APP_DASHBOARD_PASSWORD as string,
    FIREBASE: JSON.parse(process.env.REACT_APP_FIREBASE as string),
  };
};

export const isLocalDevEnv = (): boolean => getEnv().ENV === ENVS.DEV_LOCAL;
