import { createAsyncThunk } from "@reduxjs/toolkit";
import { isEmail, isMobile } from "utils";
import { ThunkApiConfig } from "..";

export enum MaskedPnrRejectReason {
  NO_RESULTS,
  SERVER_ERROR,
}

export const maskedPnrs = createAsyncThunk<
  { id: string; name: string; isCheckin: boolean }[],
  string,
  ThunkApiConfig
>(
  "apis/masked-pnrs",
  async (
    registeringWithValue,
    {
      extra: {
        apis: { maskedPnrs },
      },
      rejectWithValue,
    }
  ) => {
    try {
      const isMobileOrPnr = isMobile(registeringWithValue)
        ? { mobile: registeringWithValue }
        : { pnr: registeringWithValue };
      const value = isEmail(registeringWithValue)
        ? { email: registeringWithValue }
        : isMobileOrPnr;
      const res = await maskedPnrs(value);
      if (res.results.length > 0) {
        return [];
      } else {
        return rejectWithValue(MaskedPnrRejectReason.NO_RESULTS);
      }
    } catch (error) {
      return rejectWithValue(MaskedPnrRejectReason.SERVER_ERROR);
    }
  }
);
