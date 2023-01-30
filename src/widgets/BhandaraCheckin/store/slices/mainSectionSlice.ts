import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageKeys } from "widgets/BhandaraCheckin/constants";
import { SectionMainStateProps } from "widgets/BhandaraCheckin/types";

export const getMainSectionInitialState = (): SectionMainStateProps => {
  const isScannerOn = Boolean(
    localStorage.getItem(LocalStorageKeys.TURN_ON_SCANNER)
  );
  const mode = localStorage.getItem(LocalStorageKeys.MODE);
  const isDarkMode = mode === "dark";
  const batches = [
    {
      label: "Batch 1",
      value: "batch-1",
    },
    {
      label: "Batch 2",
      value: "batch-2",
    },
    {
      label: "Both Batches",
      value: "both-batches",
    },
  ];
  return {
    value: "",
    helperText: "For mobile, please use country code.  For ex. +91868...",
    error: false,
    isProcessing: false,
    isDarkMode,
    isScannerOn,
    scanBtnDisabled: !isScannerOn,
    scanBtnProcessing: false,
    batches,
    selectedBatch: batches[1].value,
  };
};

const mainSectionSlice = createSlice({
  name: "main-section",
  initialState: getMainSectionInitialState(),
  reducers: {
    setValue: (state, { payload }: { payload: string }) => {
      state.value = payload;
    },
    setBatch: (state, { payload }: { payload: string }) => {
      state.selectedBatch = payload;
    },
    setDarkMode: (state) => {
      state.isDarkMode = true;
    },
    setLightMode: (state) => {
      state.isDarkMode = false;
    },
    reset: () => getMainSectionInitialState(),
    setError: (state, { payload }: { payload: string }) => {
      state.helperText = payload;
      state.error = true;
      state.isProcessing = false;
    },
    stopProcessing: (state) => {
      state.isProcessing = false;
    },
    resetError: (state) => {
      const initialState = getMainSectionInitialState();
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
  // getInitialState: getMainSectionInitialState,
} = mainSectionSlice;
