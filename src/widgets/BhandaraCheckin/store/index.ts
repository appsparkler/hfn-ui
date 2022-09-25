import { configureStore } from "@reduxjs/toolkit";
import { BhandaraCheckinAPIs, ThunkApiConfig } from "../types";
import {
  locationReducer,
  locationMiddleware,
  locationEnhancer,
  pageReducer,
} from "widgets/BhandaraCheckin/routing";
import {
  bhandaraCheckinReducer,
  mainSectionReducer,
  snackbarReducer,
  modeReducer,
  updateDetailsReducer,
  envReducer,
  dashboardReducer,
  appUpdaterReducer,
} from "./slices";
import { offlineDataReducer } from "./slices/offlineData";
import { barcodeScannerReducer } from "widgets/BhandaraCheckinV0/store";

export const rootReducer = {
  bhandaraCheckin: bhandaraCheckinReducer,
  mainSection: mainSectionReducer,
  updateDetailsV2Section: updateDetailsReducer,
  snackbar: snackbarReducer,
  mode: modeReducer,
  barcodeScanner: barcodeScannerReducer,
  location: locationReducer,
  page: pageReducer,
  offlineData: offlineDataReducer,
  env: envReducer,
  dashboard: dashboardReducer,
  appUpdaterProps: appUpdaterReducer,
};

const exampleStore = configureStore({
  reducer: rootReducer,
  enhancers: [locationEnhancer],
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: {
        extraArgument: {
          apis: {} as BhandaraCheckinAPIs,
        } as ThunkApiConfig["extra"],
      },
    }),
    locationMiddleware,
  ],
});

export type RootState = ReturnType<typeof exampleStore.getState>;

export type RootDispatch = typeof exampleStore.dispatch;

export * from "./actions";
export * from "./slices";
