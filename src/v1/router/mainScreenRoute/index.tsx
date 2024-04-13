import { RouteObject, useNavigate } from "react-router-dom";
import { MainScreenConnected } from "v1/features/MainScreen/MainScreenConnected";
import { appRoutes } from "v1/model/data/routes";
import { ILocationState } from "v1/model/interfaces/ILocationState";
import { isValidAbhyasiId } from "v1/model/utils/validations";

const Component = () => {
  const navigate = useNavigate();
  const handleClickCheckin: (locationState: ILocationState) => void = ({
    batch,
    inputValue,
  }) => {
    if (isValidAbhyasiId(inputValue)) {
      navigate(appRoutes.ABHYASI_ID_CHECKIN, {
        state: {
          batch,
          inputValue,
        },
      });
    }
  };
  return <MainScreenConnected onClickCheckin={handleClickCheckin} />;
};

export const mainScreenRouteObject: RouteObject = {
  path: appRoutes.MAIN_SCREEN,
  Component,
};
