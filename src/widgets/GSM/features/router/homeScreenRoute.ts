import { RouteObject } from "react-router-dom";
import { HomeScreenWithVM } from "../HomeScreen/HomeScreenWithVM";

enum AppRoutes {
  HOME_SCREEN = "/",
  SUCCESS_SCREEN = "/success-screen",
}

export const homeScreenRoute: RouteObject = {
  index: true,
  path: AppRoutes.HOME_SCREEN,
  Component: HomeScreenWithVM,
};
