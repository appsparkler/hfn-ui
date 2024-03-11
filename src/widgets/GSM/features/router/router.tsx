import { Outlet, createBrowserRouter } from "react-router-dom";
import { homeScreenRoute } from "./homeScreenRoute";
import { successScreenRoute } from "./successScreenRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component() {
      return <Outlet />;
    },
    children: [homeScreenRoute, successScreenRoute],
  },
]);
