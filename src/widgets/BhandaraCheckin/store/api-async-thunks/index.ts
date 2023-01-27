import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";
import { errorServer } from "widgets/BhandaraCheckin/utils";

export * from "./checkinWithAbhyasiId";
export * from "./checkinWithEmailOrMobile";
export * from "./isAbhyasiCheckedIn";
export * from "./isUserCheckedIn";
export * from "./getAppVersionNumber";
export * from "./signInAnonymously";
export * from "./signOutAnonymously";
export * from "./checkinWithQRCode";
export * from "./updateMetadata";

export const getMetadataAsyncThunk = createAsyncThunk<
  any,
  void,
  ThunkApiConfig
>("getMetadata", async (_, thunkApi) => {
  try {
    const { apis } = thunkApi.extra;
    const metadata = await apis.getMetadata();
    return thunkApi.fulfillWithValue(metadata);
  } catch (error) {
    return thunkApi.rejectWithValue(errorServer());
  }
});
