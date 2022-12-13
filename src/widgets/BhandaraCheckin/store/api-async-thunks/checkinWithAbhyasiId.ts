import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorCodes } from "widgets/BhandaraCheckin/constants";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";

export const checkinWithAbhyasiId = createAsyncThunk<
  any,
  { abhyasiId: string; dormAndBirthAllocation: string; batch: string },
  ThunkApiConfig
>(
  "api/checkinWithAbhyasiId",
  (
    { abhyasiId, dormAndBirthAllocation, batch },
    {
      extra: {
        apis: { checkinAbhyasi },
      },
      fulfillWithValue,
      rejectWithValue,
    }
  ) => {
    try {
      const checkInSuccess = checkinAbhyasi(
        abhyasiId,
        dormAndBirthAllocation,
        batch
      );
      if (checkInSuccess) {
        return fulfillWithValue(true);
      }
    } catch (error) {
      return rejectWithValue(ErrorCodes.SERVER_ERROR);
    }
  }
);
