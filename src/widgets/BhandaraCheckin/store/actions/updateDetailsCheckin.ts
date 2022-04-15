import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, ThunkApiConfig } from "..";
import { snackbarSlice } from "../../../../components/Snackbar/snackbarSlice";
import { updateDetailsSectionSlice } from "../slices";
import { checkinMobileOrEmailUser } from "./checkinMobileOrEmailUser";
import { continueCheckinAbhyasiPart2 } from "./startCheckinAbhyasi";
import { isAbhyasiId } from "./utils";

export const updateDetailsCheckin = createAsyncThunk<
  void,
  undefined,
  ThunkApiConfig
>(
  "updateDetailsSection/checkin-in",
  async (state, { dispatch, extra: { apis }, getState }) => {
    const { mainSection } = getState() as RootState;
    dispatch(
      updateDetailsSectionSlice.actions.setState({
        isProcessing: true,
      })
    );
    if (isAbhyasiId(mainSection.value)) {
      const res = await dispatch(continueCheckinAbhyasiPart2());
      if (res.meta.requestStatus === "rejected") {
        dispatch(
          snackbarSlice.actions.openSnackbar({
            children: res.payload as string,
          })
        );
        dispatch(updateDetailsSectionSlice.actions.stopProcessing());
      }
    } else {
      dispatch(checkinMobileOrEmailUser());
    }
  }
);
