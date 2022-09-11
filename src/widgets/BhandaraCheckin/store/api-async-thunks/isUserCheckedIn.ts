import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";
import { ErrorCodes } from "widgets/BhandaraCheckin/constants";
import { CheckinEmailOrMobileUserDetails } from "@hfn-checkins/types";

export const isUserCheckedIn = createAsyncThunk<
  any,
  CheckinEmailOrMobileUserDetails,
  ThunkApiConfig
>(
  "api/isUserCheckedIn",
  async (
    user,
    {
      extra: {
        apis: { isUserAlreadyCheckedIn },
      },
      fulfillWithValue,
      rejectWithValue,
    }
  ) => {
    try {
      const isCheckedIn = await isUserAlreadyCheckedIn(user);
      return isCheckedIn
        ? rejectWithValue(ErrorCodes.USER_ALREADY_CHECKED_IN)
        : fulfillWithValue(true);
    } catch (error) {
      return rejectWithValue(ErrorCodes.SERVER_ERROR);
    }
  }
);
