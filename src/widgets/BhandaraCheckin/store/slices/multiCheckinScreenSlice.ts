import { createSlice } from "@reduxjs/toolkit";
import {
  ICheckinInfoTilesStateProps,
  IQREventInfo,
  IQRUserInfo,
  MultiCheckinScreenStateProps,
  ICheckinTileInfo,
} from "widgets/BhandaraCheckin/types";

const getInitialState = (): MultiCheckinScreenStateProps => ({
  userData: [],
  eventInfo: {
    eventId: "",
    eventName: "",
    pnr: "",
  },
});

const mapUserToCheckinTileData = (
  users: IQRUserInfo[]
): ICheckinInfoTilesStateProps["data"] => {
  return users.map((user) => ({
    dormPreference: user.dormPrference,
    berthPreference: user.berthPreference,
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
      { payload }: { payload: { event: IQREventInfo; users: IQRUserInfo[] } }
    ) => {
      const userData = mapUserToCheckinTileData(payload.users);
      state.userData = userData;
      state.eventInfo = payload.event;
    },
    setUserData: (state, { payload }: { payload: ICheckinTileInfo[] }) => {
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
