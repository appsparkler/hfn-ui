import { getEnvVariable } from "../../../utils/add-hoc";

export const API_URL = getEnvVariable("API_URL") as string;
export const API_VERSION = getEnvVariable("API_VERSION") as string;
export const EVENT_ID = getEnvVariable("EVENT_ID") as string;
export const CLIENT_ID = getEnvVariable("CLIENT_ID") as string;
export const CLIENT_SECRET = getEnvVariable("CLIENT_SECRET") as string;
export const USER_NAME = getEnvVariable("USER_NAME") as string;
export const USER_PASSWORD = getEnvVariable("USER_PASSWORD") as string;
export const GRANT_TYPE = getEnvVariable("GRANT_TYPE") as string;
