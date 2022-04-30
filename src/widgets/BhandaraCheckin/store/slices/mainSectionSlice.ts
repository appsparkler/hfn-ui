import { createSlice } from "@reduxjs/toolkit";
import { SectionMainStateProps } from "../../SectionMain/SectionMain";

const getInitialState = (): SectionMainStateProps => {
  return {
    value: "",
    helperText: "For mobile, please use country code.  For ex. +91868...",
    error: false,
    isProcessing: false,
    isDarkMode: false,
  };
};

const mainSectionSlice = createSlice({
  name: "main-section",
  initialState: getInitialState(),
  reducers: {
    setValue: (state, { payload }: { payload: string }) => {
      state.value = payload;
    },
    reset: () => getInitialState(),
    setError: (state, { payload }: { payload: string }) => {
      state.helperText = payload;
      state.error = true;
      state.isProcessing = false;
    },
    stopProcessing: (state) => {
      state.isProcessing = false;
    },
    startProcessing: (state) => {
      state.isProcessing = true;
    },
    setState: (
      state,
      { payload }: { payload: Partial<SectionMainStateProps> }
    ) => ({
      ...state,
      ...payload,
    }),
  },
});

export const {
  actions: mainSectionActions,
  reducer: mainSectionReducer,
  name: mainSectionName,
  getInitialState: getMainSectionInitialState,
} = mainSectionSlice;
