import { createAsyncThunk } from "@reduxjs/toolkit";
import { map } from "lodash/fp";
import { CheckboxItem } from "widgets/BhandaraCheckin/SectionMultipleCheckin/SectionMultipleCheckin";
import { MaskedPnrResponseItem } from "widgets/BhandaraCheckin/types";
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
  bhandaraCheckinActions,
  mainSectionActions,
  mainSectionName,
  multipleCheckinActions,
  snackbarActions,
} from "../../slices";

export const mapMaskedPnrResultsToCheckboxItem = map<
  MaskedPnrResponseItem,
  CheckboxItem
>(({ checkedIn, id, name }) => ({
  id,
  name,
  checked: checkedIn,
  disabled: checkedIn,
}));

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
      const items = mapMaskedPnrResultsToCheckboxItem(
        res.payload as MaskedPnrResponseItem[]
      );
      dispatch(multipleCheckinActions.setItems(items));
      dispatch(bhandaraCheckinActions.goToMultipleCheckin());
    }
  }
);
