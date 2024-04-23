const emailRegEx = new RegExp(
  /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$/
);
const abhyasiIdRegex = /^([a-zA-Z]{6}[0-9]{3}|[HABhab]{1}[0-9]{8})$/;

const abhyasiIdTempRegex = /^([HABhab]{1}[0-9]{8})$/;

export const mobileNumberRegex = /^(\+|00)[1-9][0-9 \-().]{7,32}$/;

const isValid = (str: string, regExp: RegExp) => Boolean(str.match(regExp));

export const isValidEmail = (str: string) => isValid(str, emailRegEx);

export const isValidAbhyasiId = (str: string) =>
  isValid(str, abhyasiIdRegex) || isValid(str, abhyasiIdTempRegex);

export const isValidMobileNumber = (str: string) =>
  isValid(str, mobileNumberRegex);
