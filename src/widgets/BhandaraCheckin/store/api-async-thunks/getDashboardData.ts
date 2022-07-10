import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";
import { ErrorCodes } from "widgets/BhandaraCheckin/constants";

export const getDashboardData = createAsyncThunk<
  any,
  undefined,
  ThunkApiConfig
>(
  "api/isUserCheckedIn",
  async (
    _,
    {
      extra: {
        apis: { getDashboardData },
      },
      fulfillWithValue,
      rejectWithValue,
    }
  ) => {
    try {
      const docsSize = await getDashboardData();
      return fulfillWithValue(docsSize);
    } catch (error) {
      return rejectWithValue(ErrorCodes.SERVER_ERROR);
    }
  }
);
