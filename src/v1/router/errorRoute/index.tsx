import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "v1/features/ErrorBoundary/ErrorBoundary";
import { appRoutes } from "v1/model/data/routes";

export const ErrorElement = () => {
  const navigate = useNavigate();
  const handleClickGoToMainScreen = () => {
    navigate(appRoutes.MAIN_SCREEN);
  };
  return <ErrorBoundary onClickGoToMainScreen={handleClickGoToMainScreen} />;
};
