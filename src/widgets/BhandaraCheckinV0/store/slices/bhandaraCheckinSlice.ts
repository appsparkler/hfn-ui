import { createSlice } from "@reduxjs/toolkit";
import { CurrentSectionEnum } from "../../types";
import { BhandaraCheckinViewStateProps } from "../../BhandaraCheckin/BhandaraCheckinView";
import { LocalStorageKeys } from "widgets/BhandaraCheckinV0/constants";

const getInitialState = (): BhandaraCheckinViewStateProps => {
  const renderScanner = Boolean(
    localStorage.getItem(LocalStorageKeys.TURN_ON_SCANNER)
  );
  return {
    currentSection: CurrentSectionEnum.MAIN,
    renderScanner,
  };
};

const bhandaraCheckinSlice = createSlice({
  name: "bhandara-checkin",
  initialState: getInitialState(),
  reducers: {
    reset: () => getInitialState(),
    goToMain: (state) => {
      state.currentSection = CurrentSectionEnum.MAIN;
    },
    goToUpdateDetails: (state) => {
      state.currentSection = CurrentSectionEnum.UPDATE_DETAILS;
    },
    goToCheckinSuccess: (state) => {
      state.currentSection = CurrentSectionEnum.CHECKIN_SUCCESS;
    },
    renderScanner: (state) => {
      state.renderScanner = true;
    },
    unmountScanner: (state) => {
      state.renderScanner = false;
    },
  },
});

export const {
  actions: bhandaraCheckinActions,
  getInitialState: getBhandaraCheckinInitialState,
  name: bhandaraCheckinName,
  reducer: bhandaraCheckinReducer,
} = bhandaraCheckinSlice;
