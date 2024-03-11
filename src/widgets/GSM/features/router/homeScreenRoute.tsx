import { RouteObject, useNavigate } from "react-router-dom";
import { HomeScreenWithVM } from "../HomeScreen/HomeScreenWithVM";
import { AppRoutes } from "./AppRoutes";

const HomeScreenComponent: React.FC<{}> = () => {
  const navigate = useNavigate();
  const handleCheckin = () => {
    navigate(AppRoutes.SUCCESS_SCREEN);
  };
  return <HomeScreenWithVM onCheckin={handleCheckin} />;
};

export const homeScreenRoute: RouteObject = {
  index: true,
  path: AppRoutes.HOME_SCREEN,
  Component: HomeScreenComponent,
};
