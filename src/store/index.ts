import { configureStore } from "@reduxjs/toolkit";
import { bhandaraCheckinSlice } from "./slices";

const store = configureStore({
  reducer: {
    bhandaraCheckin: bhandaraCheckinSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          apis: {
            testApi: () =>
              new Promise((resolve, reject) => {
                setTimeout(() => resolve("done"), 600);
              }),
          },
        },
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export * from "./slices";
