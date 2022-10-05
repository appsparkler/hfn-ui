import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";
import {} from "@reduxjs/toolkit";
import { ErrorCodes } from "widgets/BhandaraCheckin/constants";

export const signOutAnonymously = createAsyncThunk<
  any,
  undefined,
  ThunkApiConfig
>(
  "api/signOutAnonymously",
  async (
    _,
    {
      extra: {
        apis: { signOutAnonymously },
      },
      fulfillWithValue,
      rejectWithValue,
    }
  ) => {
    try {
      await signOutAnonymously();
      return fulfillWithValue(true);
    } catch (error) {
      return rejectWithValue(ErrorCodes.SERVER_ERROR);
    }
  }
);
