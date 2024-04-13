import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CheckinType } from "v1/model/data/checkinTypes";
import { IEmailOrMobileCheckinAPIPayload } from "../../model/interfaces/api/IEmailOrMobileCheckinAPIPayload";
import { RootState } from "v1/app/store";

export const checkinWithEmailOrMobile = createAsyncThunk(
  "emailOrMobileCheckinScreen/checkinWithEmailOrMobile",
  (payload: IEmailOrMobileCheckinAPIPayload) => {
    debugger;
  }
);

const initialState: { apiPayload: IEmailOrMobileCheckinAPIPayload } = {
  apiPayload: {
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
  },
};

const emailOrMobileCheckinScreenSlice = createSlice({
  name: "emailOrMobileCheckinScreenSlice",
  initialState,
  reducers: {
    updateAPIPayload(
      state,
      action: PayloadAction<IEmailOrMobileCheckinAPIPayload>
    ) {
      state.apiPayload = action.payload;
    },
    updateInitialData(
      state,
      {
        payload,
      }: PayloadAction<{
        batch: string;
        email: string;
        mobile: string;
      }>
    ) {
      state.apiPayload = {
        ...state.apiPayload,
        ...payload,
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
