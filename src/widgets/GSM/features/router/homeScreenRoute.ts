import { RouteObject } from "react-router-dom";
import { HomeScreenWithVM } from "../HomeScreen/HomeScreenWithVM";
import { AppRoutes } from "./AppRoutes";

export const homeScreenRoute: RouteObject = {
  index: true,
  path: AppRoutes.HOME_SCREEN,
  Component: HomeScreenWithVM,
};
