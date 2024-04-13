import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CheckinType } from "v1/model/data/checkinTypes";
import { IEmailOrMobileCheckinAPIPayload } from "../../model/interfaces/api/IEmailOrMobileCheckinAPIPayload";
import { RootState } from "v1/app/store";

const initialState: IEmailOrMobileCheckinAPIPayload = {
  batch: "",
  fullName: "",
  ageGroup: "",
  gender: "",
  city: "",
  state: "",
  country: "",
  mobile: "",
  email: "",
  dormAndBerthAllocation: "",
  type: CheckinType.EMAIL_OR_MOBILE,
  timestamp: Date.now(),
};

const emailOrMobileCheckinScreenSlice = createSlice({
  name: "emailOrMobileCheckinScreenSlice",
  initialState,
  reducers: {
    updateAPIPayload(
      state,
      action: PayloadAction<Partial<IEmailOrMobileCheckinAPIPayload>>
    ) {
      state = {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  actions: emailOrMobileCheckinScreenActions,
  reducer: emailOrMobileCheckinScreenReducer,
} = emailOrMobileCheckinScreenSlice;

export const selectEmailOrMobileCheckinScreen = (state: RootState) =>
  state.emailOrMobileCheckinScreen;
