import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMainScreenStateProps } from "./MainScreen";
import {
  isValidAbhyasiId,
  isValidEmail,
  isValidMobileNumber,
} from "v1/model/utils/validations";
import { event } from "v1/model/data/event";

const initialState: IMainScreenStateProps & { selectedBatch: string } = {
  eventTitle: event.title,
  defaultBatchValue: event.defaultBatch,
  value: "",
  selectedBatch: event.defaultBatch,
  isCheckinDisabled: true,
};

const mainScreenSlice = createSlice({
  name: "mainScreenSlice",
  initialState: initialState,
  reducers: {
    updateBatch: (state, action: PayloadAction<string>) => {
      state.selectedBatch = action.payload;
    },
    updateValue: (state, action: PayloadAction<string>) => {
      const isValid =
        isValidAbhyasiId(action.payload) ||
        isValidMobileNumber(action.payload) ||
        isValidEmail(action.payload);
      state.value = action.payload;
      state.isCheckinDisabled = !isValid;
    },
  },
});

export const { actions: mainScreenActions, reducer: mainScreenReducer } =
  mainScreenSlice;
