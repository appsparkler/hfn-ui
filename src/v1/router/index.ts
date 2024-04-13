import { RouteObject, createBrowserRouter } from "react-router-dom";
import { mainScreenRouteObject } from "./mainScreenRoute";
import { abhyasiIdCheckinRouteObject } from "./abhyasiIdCheckinRoute";
import { ErrorElement, TheOutlet } from "./ErrorElement";

export const browserRouter = createBrowserRouter([
  {
    path: "/",
    ErrorBoundary: ErrorElement,
    Component: TheOutlet,
    children: [mainScreenRouteObject, abhyasiIdCheckinRouteObject],
  } as RouteObject,
]);
