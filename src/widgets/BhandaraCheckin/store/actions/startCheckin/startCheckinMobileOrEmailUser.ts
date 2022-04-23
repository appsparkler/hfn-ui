import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "../../index";
import { getUserDetailsForEmailOrMobile } from "../utils";
import { updateDetailsSectionSlice } from "../../slices/updateDetailsSectionSlice";
import { bhandaraCheckinSlice } from "../../slices/bhandaraCheckinSlice";

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
