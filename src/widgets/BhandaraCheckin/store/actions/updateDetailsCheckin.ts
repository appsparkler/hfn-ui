import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, ThunkApiConfig } from "..";
import { snackbarSlice } from "../../../../components/Snackbar/snackbarSlice";
import { updateDetailsSectionSlice } from "../slices";
import { checkinAbhyasi } from "./async-thunks";
import { handleCheckinMobileOrEmailUser } from "./checkinMobileOrEmailUser";
import { isAbhyasiId } from "./utils";

export const updateDetailsCheckin = createAsyncThunk<
  void,
  undefined,
  ThunkApiConfig
>("updateDetailsSection/checkin-in", async (_, { dispatch, getState }) => {
  const { mainSection } = getState() as RootState;
  dispatch(updateDetailsSectionSlice.actions.startProcessing());
  if (isAbhyasiId(mainSection.value)) {
    const res = await dispatch(checkinAbhyasi());
    if (res.meta.requestStatus === "rejected") {
      dispatch(
        snackbarSlice.actions.openSnackbar({
          children: res.payload as string,
        })
      );
      dispatch(updateDetailsSectionSlice.actions.stopProcessing());
    }
  } else {
    dispatch(handleCheckinMobileOrEmailUser());
  }
});
