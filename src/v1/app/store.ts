import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { abhyasiIdCheckinScreenReducer } from "v1/features/AbhyasiIdCheckinScreen/abhyasiIdCheckinSlice";
import { appReducer } from "v1/features/App/appSlice";
import { emailOrMobileCheckinScreenReducer } from "v1/features/EmailOrMobileCheckinScreen/emailOrMobileCheckinScreenSlice";
import { mainScreenReducer } from "v1/features/MainScreen/mainScreenSlice";
import { qrCheckinScreenReducer } from "v1/features/QRCheckinScreen/qrCheckinScreenSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    mainScreen: mainScreenReducer,
    abhyasiIdCheckinScreen: abhyasiIdCheckinScreenReducer,
    emailOrMobileCheckinScreen: emailOrMobileCheckinScreenReducer,
    qrCheckinScreen: qrCheckinScreenReducer,
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
