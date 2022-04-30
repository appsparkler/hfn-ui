import { configureStore } from "@reduxjs/toolkit";
import { BhandaraCheckinAPIs } from "../types";
import {
  bhandaraCheckinReducer,
  mainSectionReducer,
  snackbarReducer,
  updateDetailsReducer,
  modeReducer,
} from "./slices";

export const rootReducer = {
  bhandaraCheckin: bhandaraCheckinReducer,
  mainSection: mainSectionReducer,
  updateDetailsSection: updateDetailsReducer,
  snackbar: snackbarReducer,
  mode: modeReducer,
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
