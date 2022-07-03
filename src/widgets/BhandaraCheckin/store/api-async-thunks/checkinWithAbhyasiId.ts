import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";

export const checkinWithAbhyasiId = createAsyncThunk<
  any,
  string,
  ThunkApiConfig
>(
  "api/checkinWithAbhyasiId",
  async (
    abhyasiId,
    {
      extra: {
        apis: { checkinAbhyasi },
      },
      fulfillWithValue,
      rejectWithValue,
    }
  ) => {
    try {
      const checkInSuccess = await checkinAbhyasi(abhyasiId);
      if (checkInSuccess) {
        return fulfillWithValue(true);
      }
    } catch (error) {
      return rejectWithValue(false);
    }
  }
);
