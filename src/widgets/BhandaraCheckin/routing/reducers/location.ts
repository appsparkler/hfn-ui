import { connectRoutes, RoutesMap } from "redux-first-router";

const routesMap: RoutesMap = {
  HOME: "/",
  UPDATE_DETAILS: "/update-details",
  MULTI_CHECKIN_SCREEN: "/multi-checkin",
  CHECKIN_SUCCESS: "/check-in-success",
  REFRESH_APP: "/refresh-app",
  ABHYASI_ID_CHECKIN_SCREEN: "/abhyasi-id-checkin",
  DASHBOARD: "/dashboard",
};

export const {
  reducer: locationReducer,
  middleware: locationMiddleware,
  enhancer: locationEnhancer,
} = connectRoutes(routesMap);
