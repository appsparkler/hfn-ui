import { createSlice } from "@reduxjs/toolkit";
import { CurrentSection } from "../../widgets/BhandaraCheckin/types";

export const bhandaraCheckinSlice = createSlice({
  name: "bhandara-checkin",
  initialState: {
    currentSection: CurrentSection.MAIN,
  },
  reducers: {
    goToUpdateDetails: (state) => {
      state.currentSection = CurrentSection.UPDATE_DETAILS;
    },
  },
});
