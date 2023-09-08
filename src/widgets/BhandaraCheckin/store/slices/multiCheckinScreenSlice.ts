import { createSlice } from "@reduxjs/toolkit";
import {
  ICheckinInfoTilesStateProps,
  IQREventInfo,
  IQRUserInfo,
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

const mapUserToCheckinTileData = (
  users: IQRUserInfo[]
): ICheckinInfoTilesStateProps["data"] => {
  return users.map((user) => ({
    dormPreference: String(user.dormPrference),
    berthPreference: String(user.berthPreference),
    checkin: false,
    dormAndBerthAllocation: "",
    pnr: "ABEU-JIW-JWWW",
    timestamp: Date.now(),
    type: "QR",
    batch: "batch-1",
    eventName: "2023 Birth Anniversary Celebrations of Pujya Daaji",
    orderId: "Bhandara Sept 2023",
    regId: "",
    dormAllocation: "",
    checked: false,
    fullName: user.fullName,
    registrationId: user.regId,
    abhyasiId: user.abhyasiId,
  }));
};

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
