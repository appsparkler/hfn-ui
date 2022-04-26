import {
  abhyasiIdRegex,
  abhyasiIdTempRegex,
  emailRegEx,
  mobileNumberRegex,
  pnrRegex,
} from "../constants";

export const isEmail = (value: string): boolean =>
  Boolean(value.match(emailRegEx));

export const isMobile = (value: string): boolean =>
  Boolean(value.match(mobileNumberRegex) && value.length <= 16);

export const isAbhyasiIdTemp = (value: string): boolean =>
  Boolean(value.match(abhyasiIdTempRegex));

export const isAbhyasiIdPermanent = (value: string): boolean =>
  Boolean(value.match(abhyasiIdRegex));

export const isAbhyasiId = (value: string): boolean =>
  isAbhyasiIdTemp(value) || isAbhyasiIdPermanent(value);

export const isRegex = (value: string): boolean =>
  Boolean(value.match(pnrRegex));
