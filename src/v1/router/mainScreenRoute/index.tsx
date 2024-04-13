import { RouteObject, useNavigate } from "react-router-dom";
import { MainScreenConnected } from "v1/features/MainScreen/MainScreenConnected";
import { appRoutes } from "v1/model/data/routes";

const Component = () => {
  const navigate = useNavigate();
  const handleClickCheckin = () => {
    navigate(appRoutes.ABHYASI_ID_CHECKIN, {
      state: "hello world",
    });
  };
  return <MainScreenConnected onClickCheckin={handleClickCheckin} />;
};

export const mainScreenRouteObject: RouteObject = {
  path: appRoutes.MAIN_SCREEN,
  Component,
};
