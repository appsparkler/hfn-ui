import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorCodes } from "widgets/BhandaraCheckin/constants";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";

export const getMetadata = createAsyncThunk<any, void, ThunkApiConfig>(
  "dashboard",
  (
    _,
    {
      extra: {
        apis: { getMetadata },
      },
      rejectWithValue,
      fulfillWithValue,
    }
  ) => {
    try {
      const metadata = getMetadata();
      return fulfillWithValue(metadata);
    } catch {
      return rejectWithValue(ErrorCodes.SERVER_ERROR);
    }
  }
);
