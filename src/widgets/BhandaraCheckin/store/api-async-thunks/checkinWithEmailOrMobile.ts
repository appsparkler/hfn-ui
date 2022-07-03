import { createAsyncThunk } from "@reduxjs/toolkit";
import { CheckinEmailOrMobileUserDetails } from "widgets/BhandaraCheckin/types";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";

export const checkinWithEmailOrMobile = createAsyncThunk<
  any,
  CheckinEmailOrMobileUserDetails,
  ThunkApiConfig
>(
  "api/checkinWithEmailOrMobile",
  async (
    userDetails,
    {
      extra: {
        apis: { checkinWithEmailOrMobile },
      },
      fulfillWithValue,
      rejectWithValue,
    }
  ) => {
    try {
      const checkInSuccess = await checkinWithEmailOrMobile(userDetails);
      if (checkInSuccess) {
        return fulfillWithValue(true);
      }
    } catch (error) {
      return rejectWithValue(false);
    }
  }
);
