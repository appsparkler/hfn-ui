import { RouteObject } from "react-router-dom";
import { MainScreenConnected } from "v1/features/MainScreen/MainScreenConnected";

export const mainScreenRouteObject: RouteObject = {
  path: "/",
  Component: MainScreenConnected,
};
