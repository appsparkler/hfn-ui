import { configureStore } from "@reduxjs/toolkit";
import { favouritesReducer } from "./reducers";

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootActions = typeof store.dispatch;
