import { configureStore } from "@reduxjs/toolkit";
import { snackbarSlice } from "../../../components/Snackbar/snackbarSlice";
import { BhandaraCheckinAPIs } from "../types";
import { bhandaraCheckinSlice } from "./slices";

const exampleStore = configureStore({
  reducer: {
    bhandaraCheckin: bhandaraCheckinSlice.reducer,
    snackbar: snackbarSlice.reducer,
  },
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

export * from "./slices";
