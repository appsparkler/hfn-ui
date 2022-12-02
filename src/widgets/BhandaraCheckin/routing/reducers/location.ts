import { connectRoutes, RoutesMap } from "redux-first-router";

const routesMap: RoutesMap = {
  HOME: "/",
  UPDATE_DETAILS: "/update-details",
  MULTI_CHECKIN_PAGE: "/multi-checkin",
  CHECKIN_SUCCESS: "/check-in-success",
  OFFLINE_DATA: "/offline-data",
  DASHBOARD: "/dashboard",
  REFRESH_APP: "/refresh-app",
};

export const {
  reducer: locationReducer,
  middleware: locationMiddleware,
  enhancer: locationEnhancer,
} = connectRoutes(routesMap);
