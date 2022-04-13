import { createSlice } from "@reduxjs/toolkit";
import { SectionMainStateProps } from "../../SectionMain";

export const getMainSectionInitialState = (): SectionMainStateProps => {
  return {
    value: "",
    helperText: "For mobile, please use country code.  For ex. +91868...",
    error: false,
    isProcessing: false,
  };
};

export const mainSectionSlice = createSlice({
  name: "mainSectionSlice",
  initialState: getMainSectionInitialState(),
  reducers: {
    setValue: (state, { payload }: { payload: string }) => {
      state.value = payload;
    },
    reset: () => getMainSectionInitialState(),
    setState: (
      state,
      { payload }: { payload: Partial<SectionMainStateProps> }
    ) => ({
      ...state,
      ...payload,
    }),
  },
});
