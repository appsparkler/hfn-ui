import { createSlice } from "@reduxjs/toolkit";
import { CurrentSectionEnum } from "../../types";
import { BhandaraCheckinViewStateProps } from "../../BhandaraCheckinView";

export const getBhandaraCheckinInitialState =
  (): BhandaraCheckinViewStateProps => {
    return {
      currentSection: CurrentSectionEnum.MAIN,
    };
  };

export const bhandaraCheckinSlice = createSlice({
  name: "bhandara-checkin",
  initialState: getBhandaraCheckinInitialState(),
  reducers: {
    reset: () => getBhandaraCheckinInitialState(),
    goToMain: (state) => {
      state.currentSection = CurrentSectionEnum.MAIN;
    },
    goToUpdateDetails: (state) => {
      state.currentSection = CurrentSectionEnum.UPDATE_DETAILS;
    },
    goToCheckinSuccess: (state) => {
      state.currentSection = CurrentSectionEnum.CHECKIN_SUCCESS;
    },
  },
});
