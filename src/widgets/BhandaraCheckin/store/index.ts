import { configureStore } from "@reduxjs/toolkit";
import { BhandaraCheckinAPIs } from "../types";
import { bhandaraCheckinSlice } from "./slices";

const exampleStore = configureStore({
  reducer: {
    bhandaraCheckin: bhandaraCheckinSlice.reducer,
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
