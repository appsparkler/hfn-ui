import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";
import {} from "@reduxjs/toolkit";
import { ErrorCodes } from "widgets/BhandaraCheckin/constants";

export const isAbhyasiCheckedIn = createAsyncThunk<any, string, ThunkApiConfig>(
  "api/isAbhyasiCheckedIn",
  async (
    abhyasiId,
    {
      extra: {
        apis: { isAbhyasiCheckedIn },
      },
      fulfillWithValue,
      rejectWithValue,
    }
  ) => {
    try {
      const isCheckedIn = await isAbhyasiCheckedIn(abhyasiId);
      return isCheckedIn
        ? rejectWithValue(ErrorCodes.ABHYASI_ALREADY_CHECKED_IN)
        : fulfillWithValue(true);
    } catch (error) {
      return rejectWithValue(ErrorCodes.SERVER_ERROR);
    }
  }
);
