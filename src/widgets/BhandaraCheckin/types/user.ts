export type FormUserDetailsValueWrapper<T> = {
  show?: boolean;
  isValid?: boolean;
  value?: T;
  disabled?: boolean;
};

export type FormUserDetails = {
  fullName: FormUserDetailsValueWrapper<string>;
  mobile: FormUserDetailsValueWrapper<string>;
  email: FormUserDetailsValueWrapper<string>;
  city: FormUserDetailsValueWrapper<string>;
  state: FormUserDetailsValueWrapper<string>;
  country: FormUserDetailsValueWrapper<string>;
  ageGroup: FormUserDetailsValueWrapper<string>;
  gender: FormUserDetailsValueWrapper<string>;
};
