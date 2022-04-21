import { onFileText } from "../../constants";
import { getUpdateDetailsSectionInitialState } from "../../SectionUpdateDetails/updateDetailsSectionSlice";
import { UserDetails, UserSRCM } from "../../types";

export const getConfiguredUserDetails = (user: UserSRCM): UserDetails => {
  const defaultUserDetails: UserDetails =
    getUpdateDetailsSectionInitialState().userDetails;
  return {
    ...defaultUserDetails,
    email: user.email
      ? {
          isValid: true,
          show: true,
          value: onFileText,
          disabled: true,
        }
      : defaultUserDetails.email,
    mobile: user.mobile
      ? {
          isValid: true,
          show: true,
          value: onFileText,
          disabled: true,
        }
      : defaultUserDetails.mobile,
    ageGroup: user.age_group
      ? {
          isValid: true,
          show: true,
          value: onFileText,
          disabled: true,
        }
      : defaultUserDetails.ageGroup,
    fullName: user.name
      ? {
          isValid: true,
          show: true,
          disabled: true,
          value: user.name,
        }
      : defaultUserDetails.fullName,
    gender: user.gender
      ? {
          isValid: true,
          show: true,
          value: onFileText,
          disabled: true,
        }
      : defaultUserDetails.gender,
    location: user.city
      ? {
          isValid: true,
          show: true,
          disabled: true,
          value: {
            active: true,
            c_id: user.city?.id,
            c_name: "",
            cityStateCountry: onFileText,
            country: "",
            country_id: 0,
            id: 0,
            name: "0",
            state: "",
            state_id: 0,
          },
        }
      : defaultUserDetails.location,
  };
};
