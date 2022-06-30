import { configureStore } from "@reduxjs/toolkit";
import { BhandaraCheckinAPIs } from "../types";
import {
  barcodeScannerReducer,
  bhandaraCheckinReducer,
  mainSectionReducer,
  snackbarReducer,
  updateDetailsReducer,
  modeReducer,
  updateDetailsV2Reducer,
} from "./slices";

export const rootReducer = {
  bhandaraCheckin: bhandaraCheckinReducer,
  mainSection: mainSectionReducer,
  updateDetailsSection: updateDetailsReducer,
  updateDetailsV2Section: updateDetailsV2Reducer,
  snackbar: snackbarReducer,
  mode: modeReducer,
  barcodeScanner: barcodeScannerReducer,
};

const exampleStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          apis: {} as BhandaraCheckinAPIs,
        } as ThunkApiConfig["extra"],
      },
    }),
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
