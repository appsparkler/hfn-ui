import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorCodes } from "widgets/BhandaraCheckin/constants";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";

export const getMetadata = createAsyncThunk<any, void, ThunkApiConfig>(
  "dashboard",
  async (
    _,
    {
      extra: {
        apis: { updateMetadata },
      },
      rejectWithValue,
      fulfillWithValue,
    }
  ) => {
    try {
      const metadata = await updateMetadata();
      return fulfillWithValue(metadata);
    } catch {
      return rejectWithValue(ErrorCodes.SERVER_ERROR);
    }
  }
);
