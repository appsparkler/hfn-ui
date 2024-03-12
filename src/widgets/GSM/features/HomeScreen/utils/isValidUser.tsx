import { isEmpty } from "lodash/fp";
import { ManualEntryUser } from "widgets/GSM/model/ManualEntryUser";

export function nameIsNotEmpty(user: ManualEntryUser): boolean {
  return !isEmpty(user.name);
}

function mobileIsValid(mobileNo: string): boolean {
  if (isEmpty(mobileNo)) return true;

  const regex = new RegExp("^\\+[1-9]\\d{5,14}$");
  return mobileNo.match(regex) !== null;
}

function emailIsValid(email: string): boolean {
  if (isEmpty(email)) return true;
  const emailRegex = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
  return email.match(emailRegex) !== null;
}

export function mobileOrEmailExistsAndAreValid(user: ManualEntryUser): boolean {
  const mobileOrEmailExists = !isEmpty(user.mobileNo) || !isEmpty(user.email);
  return (
    mobileOrEmailExists &&
    mobileIsValid(user.mobileNo) &&
    emailIsValid(user.email)
  );
}

// function mobileOrEmailExistsAndAreValid(mobileNo: string, email: string): boolean {
// }
export function isValidUser(user: ManualEntryUser): boolean {
  if (mobileOrEmailExistsAndAreValid(user) && nameIsNotEmpty(user)) return true;
  return false;
}
