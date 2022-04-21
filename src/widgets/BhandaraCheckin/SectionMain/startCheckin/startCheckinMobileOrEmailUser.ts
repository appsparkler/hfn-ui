import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "../../store/index";
import { bhandaraCheckinSlice } from "../../store/slices";
import { getUserDetailsForEmailOrMobile } from "../../store/actions/utils";
import { updateDetailsSectionSlice } from "../../SectionUpdateDetails/updateDetailsSectionSlice";

export const startCheckinMobileOrEmailUser = createAsyncThunk<
  boolean,
  string,
  ThunkApiConfig
>(
  "bhandara-checkin/startCheckinMobileOrEmailUser",
  async (emailOrMobile, { dispatch }) => {
    const userDetails = getUserDetailsForEmailOrMobile(emailOrMobile);
    dispatch(updateDetailsSectionSlice.actions.setState({ userDetails }));
    dispatch(bhandaraCheckinSlice.actions.goToUpdateDetails());
    return true;
  }
);
