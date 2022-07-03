import { configureStore } from "@reduxjs/toolkit";
import { BhandaraCheckinAPIs } from "../types";
import {
  locationReducer,
  locationMiddleware,
  pageReducer,
  locationEnhancer,
} from "widgets/BhandaraCheckin/routing";
import {
  barcodeScannerReducer,
  bhandaraCheckinReducer,
  mainSectionReducer,
  snackbarReducer,
  modeReducer,
  updateDetailsV2Reducer,
} from "./slices";

export const rootReducer = {
  bhandaraCheckin: bhandaraCheckinReducer,
  mainSection: mainSectionReducer,
  updateDetailsV2Section: updateDetailsV2Reducer,
  snackbar: snackbarReducer,
  mode: modeReducer,
  barcodeScanner: barcodeScannerReducer,
  location: locationReducer,
  page: pageReducer,
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

export type ThunkApiConfig = {
  extra: {
    apis: BhandaraCheckinAPIs;
  };
};

export * from "./actions";
export * from "./slices";
