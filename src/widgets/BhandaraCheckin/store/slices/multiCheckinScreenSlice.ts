import { createSlice } from "@reduxjs/toolkit";
import {
  IQREventInfo,
  MultiCheckinScreenStateProps,
  PNRType,
} from "widgets/BhandaraCheckin/types";
import { QRCodeCheckin } from "widgets/BhandaraCheckin/utils/QRCodeCheckin";

const getInitialState = (): MultiCheckinScreenStateProps => ({
  userData: [],
  more: "",
  eventInfo: {
    eventName: "",
    pnr: "",
    session: "Bhandara",
    pnrType: PNRType.FREE_ACCOMODATION,
  },
});

export const multiCheckinScreenSlice = createSlice({
  name: "multiCheckinScreen",
  initialState: getInitialState(),
  reducers: {
    setData: (
      state,
      {
        payload,
      }: {
        payload: { event: IQREventInfo; more: string; users: QRCodeCheckin[] };
      }
    ) => {
      state.userData = payload.users;
      state.more = payload.more;
      state.eventInfo = payload.event;
    },
    setUserData: (state, { payload }: { payload: QRCodeCheckin[] }) => {
      state.userData = payload;
    },
  },
});

export const {
  actions: multiCheckinScreenActions,
  reducer: multiCheckinScreenReducer,
  getInitialState: getMultiCheckinScreenState,
  name: multiCheckinScreenName,
} = multiCheckinScreenSlice;
