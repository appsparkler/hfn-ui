import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IHomeScreenProps } from "./HomeScreen";
import { ManualEntryUser } from "widgets/GSM/model/ManualEntryUser";
import { RootState } from "../redux-app/store";

const homeScreenSlice = createSlice({
  name: "homeScreen",
  initialState: getInitialState,
  reducers: {
    updateUserInfo: (state, { payload }: PayloadAction<ManualEntryUser>) => {
      state.user = payload;
    },
    resetUserInfo: (state) => {
      state.user = getInitialState().user;
    },
    turnOffScanner: (state) => {
      state.isScannerOn = false;
    },
    turnOnScanner: (state) => {
      state.isScannerOn = true;
    },
    enableCheckinButton: (state) => {
      state.checkinButtonDisabled = false;
    },
    disableCheckinButton: (state) => {
      state.checkinButtonDisabled = true;
    },
  },
});

export const { actions: homeScreenActions, reducer: homeScreenReducer } =
  homeScreenSlice;

export const selectHomeScreenState = (state: RootState) => state.homeScreen;

function getInitialState(): IHomeScreenProps {
  return {
    checkinButtonDisabled: true,
    isScannerOn: false,
    user: {
      name: "",
      mobileNo: "",
      email: "",
      organization: "",
      checkinTime: Date.now(),
      uid: null,
      platform: "WEB",
    },
  };
}
