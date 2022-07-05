import { Env, ENVS } from "widgets/BhandaraCheckin/types";

export const getEnv = (): Env => {
  return {
    ENV: process.env.REACT_APP_ENV as ENVS,
  };
};

export const isLocalDevEnv = (): boolean => getEnv().ENV === ENVS.DEV_LOCAL;
