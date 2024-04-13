import { isEmpty } from "lodash/fp";
import { LoaderFunction, RouteObject, useNavigate } from "react-router-dom";
import { store } from "v1/app/store";
import { MainScreenConnected } from "v1/features/MainScreen/MainScreenConnected";
import { mainScreenActions } from "v1/features/MainScreen/mainScreenSlice";
import { appRoutes } from "v1/model/data/routes";
import { ILocationState } from "v1/model/interfaces/ILocationState";
import { IEmailOrMobileCheckinLocationState } from "v1/model/interfaces/IMobileCheckinLocationState";
import {
  isValidAbhyasiId,
  isValidEmail,
  isValidMobileNumber,
} from "v1/model/utils/validations";

const loader: LoaderFunction = () => {
  store.dispatch(mainScreenActions.resetState());

  return null;
};

const Component = () => {
  const navigate = useNavigate();

  const handleClickCheckin: (locationState: ILocationState) => void = ({
    batch,
    inputValue,
  }) => {
    if (isEmpty(batch)) return;
    if (isValidAbhyasiId(inputValue)) {
      navigate(appRoutes.ABHYASI_ID_CHECKIN, {
        state: {
          batch,
          inputValue,
        },
      });
    }
    const isEmailCheckin = isValidEmail(inputValue);
    const isMobileCheckin = isValidMobileNumber(inputValue);
    if (isEmailCheckin || isMobileCheckin) {
      const state: IEmailOrMobileCheckinLocationState = {
        initialEmailAddress: isEmailCheckin ? inputValue : "",
        initialMobileNumber: isMobileCheckin ? inputValue : "",
        isEmailCheckin,
        initialBatch: batch,
      };
      navigate(appRoutes.EMAIL_OR_MOBILE_CHECKIN, {
        state,
      });
    }
  };

  const handleClickScan = () => {
    navigate(appRoutes.SCANNER);
  };

  return (
    <MainScreenConnected
      onClickCheckin={handleClickCheckin}
      onClickScan={handleClickScan}
    />
  );
};

export const mainScreenRouteObject: RouteObject = {
  index: true,
  // path: appRoutes.MAIN_SCREEN,
  Component,
  loader,
};
