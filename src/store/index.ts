import { configureStore } from "@reduxjs/toolkit";
import { bhandaraCheckinSlice } from "./slices";

const store = configureStore({
  reducer: {
    bhandaraCheckin: bhandaraCheckinSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export * from "./slices";
