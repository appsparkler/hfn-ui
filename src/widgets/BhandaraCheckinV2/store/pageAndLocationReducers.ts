import { createSlice } from "@reduxjs/toolkit";
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

const components: Record<
  keyof PageComponents,
  LocationState<any, any> | string
> = {
  Home: "Home",
  UpdateDetails: "UpdateDetails",
  CheckInSuccess: "CheckInSuccess",
  [NOT_FOUND]: "NotFound",
};

// export const pageReducer = (
//   state = "Home",
//   action: { type: keyof PageComponents } = { type: "Home" }
// ) => components[action.type] || state;

const pageSlice = createSlice({
  name: "page",
  initialState: "Home",
  reducers: {
    Home: () => "Home",
    UpdateDetails: () => "UpdateDetails",
    CheckInSuccess: () => "CheckInSuccess",
    [NOT_FOUND]: () => "NotFound",
  },
});

export const { reducer: pageReducer, actions: pageActions } = pageSlice;

export const {
  reducer: locationReducer,
  middleware: locationMiddleware,
  enhancer: locationEnhancer,
  thunk: locationThunk,
  initialDispatch,
} = connectRoutes(routesMap);
