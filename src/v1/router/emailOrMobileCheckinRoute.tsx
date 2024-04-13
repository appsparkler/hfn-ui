import { RouteObject, useLocation } from "react-router-dom";
import { appRoutes } from "v1/model/data/routes";
import { EmailOrMobileCheckinScreen } from "v1/ui/EmailOrMobileCheckinScreen/EmailOrMobileCheckinScreen";
import { IEmailOrMobileCheckinLocationState } from "../model/interfaces/IMobileCheckinLocationState";

const Component = () => {
  const { state } = useLocation() as {
    state: IEmailOrMobileCheckinLocationState;
  };
  return (
    <EmailOrMobileCheckinScreen
      initialBatch={state.initialBatch}
      isCheckinDisabled={false}
      isMobileCheckin={state.isEmailCheckin}
      initialMobileNumber={state.initialMobileNumber}
      initialEmailAddress={state.initialEmailAddress}
      onClickCheckin={function (): void {
        throw new Error("Function not implemented.");
      }}
      onClickCancel={function (): void {
        throw new Error("Function not implemented.");
      }}
      onChange={function (name: string, value: string): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};

export const emailOrMobileCheckinRoute: RouteObject = {
  path: appRoutes.EMAIL_OR_MOBILE_CHECKIN,
  Component,
};
