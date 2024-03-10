import { createSlice } from "@reduxjs/toolkit";
import { IHomeScreenProps } from "./HomeScreen";

const homeScreenSlice = createSlice({
  name: "homeScreen",
  initialState: getInitialState,
  reducers: {},
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
