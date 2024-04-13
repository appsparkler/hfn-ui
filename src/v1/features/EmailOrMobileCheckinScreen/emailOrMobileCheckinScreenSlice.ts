import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CheckinType } from "v1/model/data/checkinTypes";
import { IEmailOrMobileCheckinAPIPayload } from "../../model/interfaces/api/IEmailOrMobileCheckinAPIPayload";

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
      action: PayloadAction<IEmailOrMobileCheckinAPIPayload>
    ) {
      state = action.payload;
    },
  },
});

export const {
  actions: emailOrMobileCheckinScreenActions,
  reducer: emailOrMobileCheckinScreenReducer,
} = emailOrMobileCheckinScreenSlice;
