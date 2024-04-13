import { Outlet, RouteObject } from "react-router-dom";
import { mainScreenRouteObject } from "./mainScreenRoute";
import { abhyasiIdCheckinRouteObject } from "./abhyasiIdCheckinRoute";
import { ErrorElement } from "./errorRoute";
import { successScreenRoute } from "./successScreenRoute";

export const rootRoute: RouteObject = {
  path: "/",
  ErrorBoundary: ErrorElement,
  Component: () => <Outlet />,
  children: [
    mainScreenRouteObject,
    abhyasiIdCheckinRouteObject,
    successScreenRoute,
  ],
};
