import { LoaderFunction, RouteObject, useNavigate } from "react-router-dom";
import { HomeScreenWithVM } from "../HomeScreen/HomeScreenWithVM";
import { AppRoutes } from "./AppRoutes";
import { signInAnonymously } from "firebase/auth";
import { firebaseAuth } from "../firebase-app";

const loader: LoaderFunction = async () => {
  await signInAnonymously(firebaseAuth);
  return null;
};

const HomeScreenComponent: React.FC<{}> = () => {
  const navigate = useNavigate();
  const handleCheckin = () => {
    navigate(AppRoutes.SUCCESS_SCREEN);
  };
  return <HomeScreenWithVM onCheckin={handleCheckin} />;
};

export const homeScreenRoute: RouteObject = {
  index: true,
  loader,
  path: AppRoutes.HOME_SCREEN,
  Component: HomeScreenComponent,
};
