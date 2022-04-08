import { createSlice } from "@reduxjs/toolkit";
import { CurrentSectionEnum } from "../../widgets/BhandaraCheckin/types";

export const bhandaraCheckinSlice = createSlice({
  name: "bhandara-checkin",
  initialState: {
    currentSection: CurrentSectionEnum.MAIN,
    registeringWithValue: "",
  },
  reducers: {
    goToUpdateDetails: (state) => {
      state.currentSection = CurrentSectionEnum.UPDATE_DETAILS;
    },
    changeRegisteringWithValue: (state, { payload }) => {
      state.registeringWithValue = payload;
    },
  },
});
