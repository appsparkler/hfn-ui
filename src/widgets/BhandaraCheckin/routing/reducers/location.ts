import { connectRoutes, RoutesMap } from "redux-first-router";

const routesMap: RoutesMap = {
  HOME: "/",
  UPDATE_DETAILS: "/update-details",
  CHECKIN_SUCCESS: "/check-in-success",
};

export const {
  reducer: locationReducer,
  middleware: locationMiddleware,
  enhancer: locationEnhancer,
  thunk: locationThunk,
  initialDispatch,
} = connectRoutes(routesMap);
