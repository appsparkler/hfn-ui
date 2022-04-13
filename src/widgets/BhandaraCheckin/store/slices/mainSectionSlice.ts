import { createSlice } from "@reduxjs/toolkit";
import { SectionMainStateProps } from "../../SectionMain";

const getInitialState = (): SectionMainStateProps => {
  return {
    value: "",
    helperText: "",
    error: false,
    isProcessing: false,
  };
};

export const mainSectionSlice = createSlice({
  name: "mainSectionSlice",
  initialState: getInitialState(),
  reducers: {
    setState: (
      state,
      { payload }: { payload: Partial<SectionMainStateProps> }
    ) => ({
      ...state,
      payload,
    }),
  },
});
