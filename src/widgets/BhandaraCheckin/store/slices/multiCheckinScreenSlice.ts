import { createSlice } from "@reduxjs/toolkit";
import {
  ICheckinInfoTilesStateProps,
  IQREventInfo,
  IQRUserInfo,
  MultiCheckinScreenStateProps,
} from "widgets/BhandaraCheckin/types";

const getInitialState = (): MultiCheckinScreenStateProps => ({
  userData: [],
  eventInfo: {
    eventId: "",
    eventName: "",
    pnr: "",
  },
});

const mapUserAndEventInfoToCheckinTileData = (
  users: IQRUserInfo[]
): ICheckinInfoTilesStateProps["data"] => {
  return users.map((user) => ({
    dormPreference: user.dormPrference,
    birthPreference: user.birthPreference,
    checked: false,
    fullName: user.fullName,
    id: user.abhyasiId,
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
      const userData = mapUserAndEventInfoToCheckinTileData(payload.users);
      state.userData = userData;
      state.eventInfo = payload.event;
    },
  },
});

export const {
  actions: multiCheckinScreenActions,
  reducer: multiCheckinScreenReducer,
  getInitialState: getMultiCheckinScreenState,
  name: multiCheckinScreenName,
} = multiCheckinScreenSlice;
