import { isEmpty } from "lodash/fp";
import { LoaderFunction, RouteObject, useNavigate } from "react-router-dom";
import { store } from "v1/app/store";
import { MainScreenConnected } from "v1/features/MainScreen/MainScreenConnected";
import { mainScreenActions } from "v1/features/MainScreen/mainScreenSlice";
import { appRoutes } from "v1/model/data/routes";
import { ILocationState } from "v1/model/interfaces/ILocationState";
import { isValidAbhyasiId } from "v1/model/utils/validations";

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
    if (isValidAbhyasiId(inputValue) && !isEmpty(batch)) {
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
  loader,
};
