import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "..";

export const checkinWithAbhyasiId = createAsyncThunk<
  void,
  string,
  ThunkApiConfig
>(
  "api/checkinWithAbhyasi",
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
    const checkInSuccess = await checkinAbhyasi(abhyasiId);
    if (checkInSuccess) {
      fulfillWithValue(true);
    } else {
      rejectWithValue(false);
    }
  }
);
