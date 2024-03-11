import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IHomeScreenProps } from "./HomeScreen";
import { ManualEntryUser } from "widgets/GSM/model/ManualEntryUser";
import { RootState } from "../redux-app/store";

const homeScreenSlice = createSlice({
  name: "homeScreen",
  initialState: getInitialState,
  reducers: {
    //   User Info
    updateUserInfo: (state, { payload }: PayloadAction<ManualEntryUser>) => {
      state.user = payload;
    },
    resetUserInfo: (state) => {
      state.user = getInitialState().user;
    },
  },
});

export const { actions: homeScreenActions, reducer: homeScreenReducer } =
  homeScreenSlice;

export const selectHomeScreenState = (state: RootState) => state.homeScreen;

function getInitialState(): IHomeScreenProps {
  return {
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
