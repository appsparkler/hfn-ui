import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISuccessScreenProps } from "./SuccessScreen";
import { ManualEntryUser } from "widgets/GSM/model/ManualEntryUser";
import { IQRUser } from "widgets/GSM/model/QRUser";
import { RootState } from "../redux-app/store";

const slice = createSlice({
  name: "successScreen",
  initialState: getInitialState,
  reducers: {
    reset(state) {
      state = getInitialState();
    },
    setManualEntryUser(state, { payload }: PayloadAction<ManualEntryUser>) {
      state.manualEntryUser = payload;
    },
    setQRUser(state, { payload }: PayloadAction<IQRUser>) {
      state.qrUser = payload;
    },
  },
});

export const { actions: successScreenActions, reducer: successScreenReducer } =
  slice;

export const selectSuccessScreen = (state: RootState) => state.successScreen;

function getInitialState(): ISuccessScreenProps {
  return {
    manualEntryUser: null,
    qrUser: null,
  };
}
