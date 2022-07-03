import { createSlice } from "@reduxjs/toolkit";
import { CurrentSectionEnum } from "../../types";
import { BhandaraCheckinViewStateProps } from "../../components/BhandaraCheckin/BhandaraCheckinView";
import { LocalStorageKeys } from "widgets/BhandaraCheckin/constants";

const getInitialState = (): BhandaraCheckinViewStateProps => {
  const renderScanner = Boolean(
    localStorage.getItem(LocalStorageKeys.TURN_ON_SCANNER)
  );
  return {
    currentSection: CurrentSectionEnum.MAIN,
    renderScanner,
    locationActionType: "Home",
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
