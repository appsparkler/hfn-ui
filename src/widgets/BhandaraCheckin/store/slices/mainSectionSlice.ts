import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageKeys } from "widgets/BhandaraCheckin/constants";
import { SectionMainStateProps } from "../../SectionMain/SectionMain";

const getInitialState = (): SectionMainStateProps => {
  const isScannerOn = Boolean(
    localStorage.getItem(LocalStorageKeys.TURN_ON_SCANNER)
  );
  return {
    value: "",
    helperText: "For mobile, please use country code.  For ex. +91868...",
    error: false,
    isProcessing: false,
    isScannerOn,
    scanBtnDisabled: !isScannerOn,
    scanBtnProcessing: false,
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
    resetError: (state) => {
      const initialState = getInitialState();
      state.error = false;
      state.helperText = initialState.helperText;
    },
    startProcessing: (state) => {
      state.isProcessing = true;
    },
    turnOnScanner: (state) => {
      state.isScannerOn = true;
      state.scanBtnDisabled = false;
    },
    turnOffScanner: (state) => {
      state.isScannerOn = false;
      state.scanBtnDisabled = true;
    },
    startProcessingScanButton: (state) => {
      state.scanBtnProcessing = true;
    },
    stopProcessingScanButton: (state) => {
      state.scanBtnProcessing = false;
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
