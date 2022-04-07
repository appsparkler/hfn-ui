import { emailRegEx } from "../constants";

export const isEmail = (value: string): boolean =>
  Boolean(value.match(emailRegEx));
