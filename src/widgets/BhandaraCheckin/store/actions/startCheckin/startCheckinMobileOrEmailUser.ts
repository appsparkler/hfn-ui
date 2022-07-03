import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "../../index";
import { getUserDetailsForEmailOrMobile } from "../utils";
import { bhandaraCheckinActions, updateDetailsActions } from "../../slices";

export const startCheckinMobileOrEmailUser = createAsyncThunk<
  boolean,
  string,
  ThunkApiConfig
>(
  "bhandara-checkin/startCheckinMobileOrEmailUser",
  async (emailOrMobile, { dispatch }) => {
    const userDetails = getUserDetailsForEmailOrMobile(emailOrMobile);
    dispatch(updateDetailsActions.setState({ userDetails }));
    dispatch(bhandaraCheckinActions.goToUpdateDetails());
    return true;
  }
);
