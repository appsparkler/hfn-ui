import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "v1/app/store";
import { IQRCheckinCardState } from "v1/model/interfaces/IQRCheckinCardState";

const initialState: {
  checkins: IQRCheckinCardState[];
} = {
  checkins: [],
};

const qrCheckinScreenSlice = createSlice({
  name: "qrCheckinScreen",
  initialState: initialState,
  reducers: {
    setupCheckins: (state, action: PayloadAction<IQRCheckinCardState[]>) => {
      state.checkins = action.payload;
    },
    updateCheckins: (state, action: PayloadAction<IQRCheckinCardState>) => {
      state.checkins.map((checkin) => {
        if (
          checkin.registrationId === action.payload.registrationId &&
          checkin.dormPreference === action.payload.dormPreference
        ) {
          return action.payload;
        } else {
          return checkin;
        }
      });
    },
  },
});

export const {
  actions: qrCheckinScreenActions,
  reducer: qrCheckinScreenReducer,
} = qrCheckinScreenSlice;

export const selectQRCheckinScreen = (state: RootState) =>
  state.qrCheckinScreen;
