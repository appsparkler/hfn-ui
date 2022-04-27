import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  errorServer,
  errorUnrecognizedInput,
} from "widgets/BhandaraCheckin/utils";
import { ThunkApiConfig } from "../..";
import {
  MaskedPnrRejectReason,
  maskedPnrs,
} from "../../api-async-thunks/maskedPnrs";
import {
  mainSectionActions,
  mainSectionName,
  snackbarActions,
} from "../../slices";

export const startMultipleCheckin = createAsyncThunk<
  void,
  string,
  ThunkApiConfig
>(
  `${mainSectionName}/start-multiple-checkin`,
  async (registeringWithValue, { rejectWithValue, dispatch }) => {
    const res = await dispatch(maskedPnrs(registeringWithValue));
    if (res.meta.requestStatus === "rejected") {
      switch (res.payload) {
        case MaskedPnrRejectReason.INVALID_QUERY:
          dispatch(mainSectionActions.setError(errorUnrecognizedInput()));
          return rejectWithValue(MaskedPnrRejectReason.INVALID_QUERY);
        case MaskedPnrRejectReason.NO_RESULTS:
          return rejectWithValue(MaskedPnrRejectReason.NO_RESULTS);
        case MaskedPnrRejectReason.SERVER_ERROR:
          dispatch(snackbarActions.openSnackbar({ children: errorServer() }));
          return rejectWithValue(MaskedPnrRejectReason.SERVER_ERROR);
        default:
          return rejectWithValue("unknown");
      }
    } else {
    }
  }
);
