import { createAsyncThunk } from "@reduxjs/toolkit";
import { isEmail, isMobile, isPnr } from "utils";
import { ThunkApiConfig } from "..";

export enum MaskedPnrRejectReason {
  NO_RESULTS,
  INVALID_QUERY,
  SERVER_ERROR,
}

export const maskedPnrs = createAsyncThunk<
  { id: string; name: string; checkedIn: boolean }[],
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
    const getValue = ($value: string) => {
      if (isEmail($value)) return { email: $value };
      if (isMobile($value)) return { mobile: $value };
      if (isPnr($value)) return { pnr: $value };
    };
    try {
      const queryParams = getValue(registeringWithValue);
      if (queryParams) {
        const res = await maskedPnrs(queryParams);
        if (res.results.length > 0) {
          return res.results;
        } else {
          return rejectWithValue(MaskedPnrRejectReason.NO_RESULTS);
        }
      }
      return rejectWithValue(MaskedPnrRejectReason.INVALID_QUERY);
    } catch (error) {
      return rejectWithValue(MaskedPnrRejectReason.SERVER_ERROR);
    }
  }
);
