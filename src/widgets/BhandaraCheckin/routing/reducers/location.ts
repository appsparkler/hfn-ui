import { connectRoutes, RoutesMap } from "redux-first-router";

const routesMap: RoutesMap = {
  HOME: "/",
  UPDATE_DETAILS: "/update-details",
  CHECKIN_SUCCESS: "/check-in-success",
  OFFLINE_DATA: "/offline-data",
};

export const {
  reducer: locationReducer,
  middleware: locationMiddleware,
  enhancer: locationEnhancer,
} = connectRoutes(routesMap);
