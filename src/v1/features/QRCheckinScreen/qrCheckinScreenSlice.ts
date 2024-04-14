import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "v1/app/store";
import { IQRCheckinCardState } from "v1/model/interfaces/IQRCheckinCardState";
import { IQRCodeCheckinAPIPayload } from "v1/model/interfaces/api/IQRCodeCheckinAPIPayload";

const initialState: {
  checkins: IQRCheckinCardState[];
} = {
  checkins: [],
};

export const checkinWithQR = createAsyncThunk(
  "qrCheckinScreen/updateCheckins",
  (updatedQRCheckin: IQRCodeCheckinAPIPayload[]) => {
    debugger;
  }
);

const qrCheckinScreenSlice = createSlice({
  name: "qrCheckinScreen",
  initialState: initialState,
  reducers: {
    setupCheckins: (state, action: PayloadAction<IQRCheckinCardState[]>) => {
      state.checkins = action.payload;
    },
    updateCheckins: (state, action: PayloadAction<IQRCheckinCardState[]>) => {
      state.checkins = action.payload;
    },
  },
});

export const {
  actions: qrCheckinScreenActions,
  reducer: qrCheckinScreenReducer,
} = qrCheckinScreenSlice;

export const selectQRCheckinScreen = (state: RootState) =>
  state.qrCheckinScreen;
