import { RouteObject, useLocation } from "react-router-dom";
import { appRoutes } from "v1/model/data/routes";
import { EmailOrMobileCheckinScreen } from "v1/ui/EmailOrMobileCheckinScreen/EmailOrMobileCheckinScreen";

interface IMobileCheckinLocationState {
  isMobileCheckin: boolean;
  initialMobileNumber: string;
  initialEmailAddress: string;
}

const Component = () => {
  const { state } = useLocation() as { state: IMobileCheckinLocationState };
  return (
    <EmailOrMobileCheckinScreen
      isCheckinDisabled={false}
      isMobileCheckin={state.isMobileCheckin}
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
