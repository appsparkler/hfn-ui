import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { mainScreenReducer } from "v1/features/MainScreen/mainScreenSlice";

export const store = configureStore({
  reducer: {
    mainScreen: mainScreenReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
