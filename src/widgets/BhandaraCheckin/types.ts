import { TextFieldProps } from "@mui/material";
import { LocationTextFieldProps, SelectFieldProps } from "../../components";

export enum CurrentSectionEnum {
  MAIN,
  UPDATE_DETAILS,
  CHECKIN_SUCCESS,
}

export type BaseUser = {
  id: string;
  abhyasiId?: string;
  fullName: string;
  ageGroup: string;
  location: string;
  gender: string;
};

export type User = BaseUser &
  ({ email: string } | { mobile: string } | { email: string; mobile: string });

export type UserDetailsValueWrapper<T> = Partial<T> & {
  show?: boolean;
  isValid?: boolean;
};

export type UserDetails = {
  fullName: UserDetailsValueWrapper<TextFieldProps>;
  mobile: UserDetailsValueWrapper<TextFieldProps>;
  email: UserDetailsValueWrapper<TextFieldProps>;
  location: UserDetailsValueWrapper<LocationTextFieldProps>;
  ageGroup: UserDetailsValueWrapper<SelectFieldProps>;
  gender: UserDetailsValueWrapper<SelectFieldProps>;
};

// const user: User = {
//   id: "id",
//   ageGroup: "19-209",
//   email: "abc@def.com",
//   fullName: "ABC DEF",
//   gender: "MALE",
//   location: "ABC",
//   mobile: "39393939",
// };
