import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMainScreenStateProps } from "./MainScreen";
import {
  isValidAbhyasiId,
  isValidEmail,
  isValidMobileNumber,
} from "v1/model/utils/validations";

const initialState: IMainScreenStateProps = {
  eventTitle: "",
  defaultBatchValue: "",
  value: "",
  isCheckinDisabled: false,
};

const mainScreenSlice = createSlice({
  name: "mainScreenSlice",
  initialState: initialState,
  reducers: {
    setIsCheckinDisabled: (state, action: PayloadAction<string>) => {
      const isValid =
        isValidAbhyasiId(action.payload) ||
        isValidMobileNumber(action.payload) ||
        isValidEmail(action.payload);
      state.isCheckinDisabled = !isValid;
    },
  },
});

export const {
    actions: mainScreenActions,
    reducer: mainScreenReducer
} = mainScreenSlice;
