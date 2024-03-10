import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IHomeScreenProps } from "./HomeScreen";
import { ManualEntryUser } from "widgets/GSM/model/ManualEntryUser";

const homeScreenSlice = createSlice({
  name: "homeScreen",
  initialState: getInitialState,
    reducers: {
      updateUserInfo: (state, {payload}: PayloadAction<ManualEntryUser>) => {
        state.user = payload;
      }
  },
});

export const {
    actions: homeScreenActions,
    reducer: homeScreenReducer,
} = homeScreenSlice

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
