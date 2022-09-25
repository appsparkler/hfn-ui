import { isEmail, isMobile } from "../../../../utils";
import { Action, Dispatch } from "redux";
import { HOME } from "widgets/BhandaraCheckin/routing/actions/page";
import { register } from "serviceWorkerRegistration";
import { FormUserDetails } from "../../types";
import { getUpdateDetailsSectionInitialState } from "../slices";

export const getUserDetailsForEmailOrMobile = (
  emailOrMobile: string
): FormUserDetails => {
  const defaultUserDetails: FormUserDetails =
    getUpdateDetailsSectionInitialState().userDetails;
  const isEmailString = isEmail(emailOrMobile);
  const isMobileString = isMobile(emailOrMobile);
  return {
    ...defaultUserDetails,
    email: isEmailString
      ? {
          ...defaultUserDetails.email,
          disabled: true,
          value: emailOrMobile.toLowerCase(),
        }
      : defaultUserDetails.email,
    mobile: isMobileString
      ? { ...defaultUserDetails.mobile, disabled: true, value: emailOrMobile }
      : defaultUserDetails.mobile,
  };
};

export async function refreshApp(dispatch: Dispatch<Action<any>>) {
  if (navigator.serviceWorker) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    const unregistrationPromises = registrations.map((registration) =>
      registration.unregister()
    );
    await Promise.all(unregistrationPromises);
    register();
    dispatch(HOME());
    window.location.reload();
  }
}
