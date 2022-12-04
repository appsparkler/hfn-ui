import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorCodes } from "widgets/BhandaraCheckin/constants";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";

export const checkinWithAbhyasiId = createAsyncThunk<
  any,
  { abhyasiId: string; dormAndBirthAllocation: string },
  ThunkApiConfig
>(
  "api/checkinWithAbhyasiId",
  (
    { abhyasiId, dormAndBirthAllocation },
    {
      extra: {
        apis: { checkinAbhyasi },
      },
      fulfillWithValue,
      rejectWithValue,
    }
  ) => {
    try {
      const checkInSuccess = checkinAbhyasi(abhyasiId, dormAndBirthAllocation);
      if (checkInSuccess) {
        return fulfillWithValue(true);
      }
    } catch (error) {
      return rejectWithValue(ErrorCodes.SERVER_ERROR);
    }
  }
);
