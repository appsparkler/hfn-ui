import { Outlet, RouteObject } from "react-router-dom";
import { mainScreenRouteObject } from "./mainScreenRoute";
import { abhyasiIdCheckinRouteObject } from "./abhyasiIdCheckinRoute";
import { ErrorElement } from "./errorRoute";
import { successScreenRoute } from "./successScreenRoute";
import { emailOrMobileCheckinRoute } from "./emailOrMobileCheckinRoute";
import { scannerRoute } from "./scannerRoute";
import { qrCheckinRoute } from "./qrCheckinRoute";

export const rootRoute: RouteObject = {
  path: "/",
  ErrorBoundary: ErrorElement,
  Component: () => <Outlet />,
  children: [
    mainScreenRouteObject,
    abhyasiIdCheckinRouteObject,
    successScreenRoute,
    emailOrMobileCheckinRoute,
    scannerRoute,
    qrCheckinRoute,
  ],
};
