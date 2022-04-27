import { createSlice } from "@reduxjs/toolkit";
import { CurrentSectionEnum } from "../../types";
import { BhandaraCheckinViewStateProps } from "../../BhandaraCheckin/BhandaraCheckinView";

const getInitialState = (): BhandaraCheckinViewStateProps => {
  return {
    currentSection: CurrentSectionEnum.MAIN,
  };
};

const bhandaraCheckinSlice = createSlice({
  name: "bhandara-checkin",
  initialState: getInitialState(),
  reducers: {
    reset: () => getInitialState(),
    goToMultipleCheckin: (state) => {
      state.currentSection = CurrentSectionEnum.MULTIPLE_CHECKIN;
    },
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

export const {
  actions: bhandaraCheckinActions,
  getInitialState: getBhandaraCheckinInitialState,
  name: bhandaraCheckinName,
  reducer: bhandaraCheckinReducer,
} = bhandaraCheckinSlice;
