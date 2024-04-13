import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { abhyasiIdCheckinScreenReducer } from "v1/features/AbhyasiIdCheckinScreen/abhyasiIdCheckinSlice";
import { appReducer } from "v1/features/App/appSlice";
import { mainScreenReducer } from "v1/features/MainScreen/mainScreenSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    mainScreen: mainScreenReducer,
    abhyasiIdCheckinScreen: abhyasiIdCheckinScreenReducer,
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
