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
  eventInfo: IQREventInfo,
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
      const updatedData = mapUserAndEventInfoToCheckinTileData(
        payload.event,
        payload.users
      );
      state.userData = updatedData;
    },
  },
});
