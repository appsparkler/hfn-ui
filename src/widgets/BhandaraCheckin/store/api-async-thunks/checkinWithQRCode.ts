import { IQRCheckinUser } from "widgets/BhandaraCheckin/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";

export const multiCheckinWithQRCode = createAsyncThunk<
  any,
  IQRCheckinUser[],
  ThunkApiConfig
>(
  "api/multiCheckinWithQRCode",
  (
    qrCodeUsers,
    {
      extra: {
        apis: { checkinWithQRCode },
      },
    }
  ) => {
    checkinWithQRCode(qrCodeUsers);
  }
);
