import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "../../store/index";
import {
  bhandaraCheckinSlice,
  updateDetailsSectionSlice,
} from "../../store/slices";
import { getUserDetailsForEmailOrMobile } from "../../store/actions/utils";

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
