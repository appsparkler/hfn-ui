import { createBrowserRouter } from "react-router-dom";
import { mainScreenRouteObject } from "./mainScreenRoute";
import { abhyasiIdCheckinRouteObject } from "./abhyasiIdCheckinRoute";

export const browserRouter = createBrowserRouter([
  mainScreenRouteObject,
  abhyasiIdCheckinRouteObject,
]);
