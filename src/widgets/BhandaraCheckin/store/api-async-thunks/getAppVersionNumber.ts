import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";
import {} from "@reduxjs/toolkit";
import { ErrorCodes } from "widgets/BhandaraCheckin/constants";

export const getAppVersionNumber = createAsyncThunk<any, void, ThunkApiConfig>(
  "api/getAppVersionNumber",
  async (
    _,
    {
      extra: {
        apis: { getAppVersion },
      },
      fulfillWithValue,
      rejectWithValue,
    }
  ) => {
    try {
      const versionNumber = await getAppVersion();
      return fulfillWithValue(versionNumber);
    } catch (error) {
      return rejectWithValue(ErrorCodes.SERVER_ERROR);
    }
  }
);
