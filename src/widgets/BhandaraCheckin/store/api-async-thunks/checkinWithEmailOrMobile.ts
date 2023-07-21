import { CheckinEmailOrMobileUserDetails } from "widgets/BhandaraCheckin/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorCodes } from "widgets/BhandaraCheckin/constants";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";

export const checkinWithEmailOrMobile = createAsyncThunk<
  any,
  CheckinEmailOrMobileUserDetails,
  ThunkApiConfig
>(
  "api/checkinWithEmailOrMobile",
  (
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
      const checkInSuccess = checkinWithEmailOrMobile(userDetails);
      if (checkInSuccess) {
        return fulfillWithValue(true);
      }
    } catch (error) {
      return rejectWithValue(ErrorCodes.SERVER_ERROR);
    }
  }
);
