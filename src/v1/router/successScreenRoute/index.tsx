import { RouteObject, useNavigate } from "react-router-dom";
import { appRoutes } from "v1/model/data/routes";
import { SuccessScreen } from "v1/features/SuccessScreen/SuccessScreen";

export const successScreenRoute: RouteObject = {
  path: appRoutes.SUCCESS_SCREEN,
  Component() {
    const navigate = useNavigate();
    const handleClickGotoMainScreen = () => {
      navigate(appRoutes.MAIN_SCREEN);
    };
    return <SuccessScreen onClickGoToMainScreen={handleClickGotoMainScreen} />;
  },
};
