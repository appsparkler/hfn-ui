import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";
import { ErrorCodes } from "widgets/BhandaraCheckin/constants";

export const signInAnonymously = createAsyncThunk<
  any,
  undefined,
  ThunkApiConfig
>(
  "api/signInAnonymously",
  async (
    _,
    {
      extra: {
        apis: { signInAnonymously },
      },
      fulfillWithValue,
      rejectWithValue,
    }
  ) => {
    try {
      await signInAnonymously();
      return fulfillWithValue(true);
    } catch (error) {
      return rejectWithValue(ErrorCodes.SERVER_ERROR);
    }
  }
);
