import { connectRoutes, NOT_FOUND, LocationState } from "redux-first-router";

const routesMap = {
  Home: "/",
  UpdateDetails: "/update-details",
  CheckInSuccess: "/check-in-success",
};

type PageComponents = {
  Home: string;
  UpdateDetails: string;
  CheckInSuccess: string;
  [NOT_FOUND]: string;
};

const components: Record<keyof PageComponents, string> = {
  Home: "Home",
  UpdateDetails: "UpdateDetails",
  CheckInSuccess: "CheckInSuccess",
  [NOT_FOUND]: "NotFound",
};

export const pageReducer = (
  state = "HOME",
  action: { type: keyof PageComponents } = { type: "Home" }
) => components[action.type] || state;

export const {
  reducer: locationReducer,
  middleware: locationMiddleware,
  enhancer: locationEnhancer,
  thunk: locationThunk,
  initialDispatch,
} = connectRoutes(routesMap);
