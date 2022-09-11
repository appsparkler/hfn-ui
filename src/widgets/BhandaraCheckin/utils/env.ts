import { Env, Environments } from "widgets/BhandaraCheckin/types";

export const getEnv = (): Env => {
  return {
    NODE_ENV: process.env.NODE_ENV as Environments,
    EMULATOR: String(process.env.REACT_APP_EMULATOR) === "true",
    FIREBASE: JSON.parse(process.env.REACT_APP_FIREBASE as string),
  };
};
