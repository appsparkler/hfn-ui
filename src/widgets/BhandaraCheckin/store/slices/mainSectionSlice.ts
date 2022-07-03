import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageKeys } from "widgets/BhandaraCheckin/constants";
import {
  disableNetwork,
  enableNetwork,
} from "widgets/BhandaraCheckin/firebase";
import { SectionMainStateProps } from "../../components/SectionMain/SectionMain";

export const getMainSectionInitialState = (): SectionMainStateProps => {
  const isScannerOn = Boolean(
    localStorage.getItem(LocalStorageKeys.TURN_ON_SCANNER)
  );
  const isNetworkOn = Boolean(
    localStorage.getItem(LocalStorageKeys.NETWORK_ENABLED)
  );
  const mode = localStorage.getItem(LocalStorageKeys.MODE);
  const isDarkMode = mode === "dark";
  return {
    value: "",
    helperText: "For mobile, please use country code.  For ex. +91868...",
    error: false,
    isProcessing: false,
    isDarkMode,
    isScannerOn,
    scanBtnDisabled: !isScannerOn,
    scanBtnProcessing: false,
    isOfflineMode: isNetworkOn,
  };
};

const mainSectionSlice = createSlice({
  name: "main-section",
  initialState: getMainSectionInitialState(),
  reducers: {
    setValue: (state, { payload }: { payload: string }) => {
      state.value = payload;
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
    enableNetwork: (state) => {
      enableNetwork();
      state.isOfflineMode = true;
    },
    disableNetwork: (state) => {
      disableNetwork();
      state.isOfflineMode = false;
    },
  },
});

export const {
  actions: mainSectionActions,
  reducer: mainSectionReducer,
  name: mainSectionName,
  // getInitialState: getMainSectionInitialState,
} = mainSectionSlice;
