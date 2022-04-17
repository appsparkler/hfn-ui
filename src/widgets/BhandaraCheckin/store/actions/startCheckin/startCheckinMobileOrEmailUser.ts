import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "../..";
import { bhandaraCheckinSlice, updateDetailsSectionSlice } from "../../slices";
import { getUserDetailsForEmailOrMobile } from "../utils";

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
