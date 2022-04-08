import { createSlice } from "@reduxjs/toolkit";
import { CurrentSectionEnum } from "../../widgets/BhandaraCheckin/types";

export const bhandaraCheckinSlice = createSlice({
  name: "bhandara-checkin",
  initialState: {
    currentSection: CurrentSectionEnum.CHECKIN_SUCCESS,
    registeringWithValue: "",
  },
  reducers: {
    goToUpdateDetails: (state) => {
      state.currentSection = CurrentSectionEnum.UPDATE_DETAILS;
    },
    goToMain: (state) => {
      state.currentSection = CurrentSectionEnum.MAIN;
    },
    goToCheckinSuccess: (state) => {
      state.currentSection = CurrentSectionEnum.CHECKIN_SUCCESS;
    },
    changeRegisteringWithValue: (state, { payload }) => {
      state.registeringWithValue = payload;
    },
  },
});
