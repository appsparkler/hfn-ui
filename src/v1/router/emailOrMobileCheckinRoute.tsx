import { RouteObject, useLocation, useNavigate } from "react-router-dom";
import { appRoutes } from "v1/model/data/routes";
import { IEmailOrMobileCheckinLocationState } from "../model/interfaces/IMobileCheckinLocationState";
import { EmailOrMobileCheckinScreenConnected } from "v1/features/EmailOrMobileCheckinScreen/EmailOrMobileCheckinScreenConnected";

const Component = () => {
  const { state } = useLocation() as {
    state: IEmailOrMobileCheckinLocationState;
  };
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(appRoutes.MAIN_SCREEN);
  };
  const handleCheckin = () => {
    navigate(appRoutes.SUCCESS_SCREEN);
  };

  return (
    <EmailOrMobileCheckinScreenConnected
      initialBatch={state.initialBatch}
      initialMobileNumber={state.initialMobileNumber}
      initialEmailAddress={state.initialEmailAddress}
      isEmailCheckin={state.isEmailCheckin}
      onClickCancel={handleCancel}
      onCheckin={handleCheckin}
    />
  );
  // return (
  //   <EmailOrMobileCheckinScreen
  //     initialBatch={state.initialBatch}
  //     isCheckinDisabled={false}
  //     isMobileCheckin={state.isEmailCheckin}
  //     initialMobileNumber={state.initialMobileNumber}
  //     initialEmailAddress={state.initialEmailAddress}
  //     onClickCheckin={handleCheckin}
  //     onClickCancel={handleCancel}
  //     onChange={handleChange}
  //   />
  // );
};

export const emailOrMobileCheckinRoute: RouteObject = {
  path: appRoutes.EMAIL_OR_MOBILE_CHECKIN,
  Component,
};
