import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorCodes } from "widgets/BhandaraCheckin/constants";
import { Batch, ThunkApiConfig } from "widgets/BhandaraCheckin/types";

export const checkinWithAbhyasiId = createAsyncThunk<
  any,
  {
    abhyasiId: string;
    dormAndBerthAllocation: string;
    eventName: string;
    batch: Batch;
  },
  ThunkApiConfig
>(
  "api/checkinWithAbhyasiId",
  (
    { abhyasiId, dormAndBerthAllocation, eventName, batch },
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
        dormAndBerthAllocation,
        eventName,
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
