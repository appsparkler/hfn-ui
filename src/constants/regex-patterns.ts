export const emailRegEx = new RegExp(
  /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$/
);
export const abhyasiIdRegex = "^([a-zA-Z]{6}[0-9]{3}|[HABhab]{1}[0-9]{8})$";
export const abhyasiIdTempRegex = "^([HAha]{1}[0-9]{8})$";
export const mobileNumberRegex = /^(\+|00)[1-9][0-9 \-().]{7,32}$/;
export const pnrRegex = /[A-Z]{2}-[A-Z]{4}-[A-Z]{4}/;
