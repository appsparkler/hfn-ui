import {
  abhyasiIdRegex,
  abhyasiIdTempRegex,
  emailRegEx,
  mobileNumberRegex,
} from "../constants";

export const isEmail = (value: string): boolean =>
  Boolean(value.match(emailRegEx));

export const isMobile = (value: string): boolean =>
  Boolean(value.match(mobileNumberRegex) && value.length <= 16);

export const isAbhyasiIdTemp = (value: string): boolean =>
  Boolean(value.match(abhyasiIdTempRegex));

export const isAbhyasiId = (value: string): boolean =>
  Boolean(value.match(abhyasiIdRegex));
