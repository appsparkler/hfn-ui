import { RouteObject, useNavigate } from "react-router-dom";
import { SuccessScreenWithVM } from "../SuccessScreen/SuccessScreenWithVM";
import { AppRoutes } from "./AppRoutes";

const SuccessScreenComponent: React.FC<{}> = () => {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate(AppRoutes.HOME_SCREEN);
  };

  return <SuccessScreenWithVM onClickGoToMainScreen={handleNav} />;
};

export const successScreenRoute: RouteObject = {
  path: AppRoutes.SUCCESS_SCREEN,
  Component: SuccessScreenComponent,
};
