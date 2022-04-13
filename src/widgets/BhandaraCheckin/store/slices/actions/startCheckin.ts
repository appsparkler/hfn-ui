import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAbhyasiId as isAbhyasiIdUtil } from "./utils";
import { RootState } from "../../index";
import {
  bhandaraCheckinSlice,
  getInitialState,
  ThunkApiConfig,
} from "../bhandara-checkin";
import {
  CurrentSectionEnum,
  UserWithEmail,
  UserWithEmailAndMobile,
  UserWithMobile,
} from "../../../types";
import { getConfiguredUserDetails } from "./utils";

const getAbhyasiData = createAsyncThunk<
  UserWithEmail | UserWithMobile | UserWithEmailAndMobile,
  string,
  ThunkApiConfig & { rejectWithValue: (errorMessage: string) => any }
>(
  "bhandara-checkin/getAbhyasiData",
  async (abhyasiId, { extra: { apis }, rejectWithValue }) => {
    try {
      const abhyasi = await apis.getAbhyasiData(abhyasiId);
      return abhyasi;
    } catch (error) {
      const errorMessage = (error as Error).message;
      return rejectWithValue(errorMessage as string);
    }
  }
);

export const startCheckin = createAsyncThunk<void, undefined, ThunkApiConfig>(
  "bhandara-checkin/start-checkin",
  async (_, { extra: { apis }, dispatch, getState }) => {
    const { bhandaraCheckin } = getState() as RootState;
    const { registeringWithValue } = bhandaraCheckin;
    dispatch(
      bhandaraCheckinSlice.actions.setState({
        startCheckinIsProcessing: true,
      })
    );
    const isAbhyasiId = isAbhyasiIdUtil(registeringWithValue);
    if (isAbhyasiId) {
      const res = await dispatch(getAbhyasiData(registeringWithValue));
      if (res.meta.requestStatus === "rejected") {
        dispatch(
          bhandaraCheckinSlice.actions.setState({
            helperText: res.payload as string,
            startCheckInError: true,
            startCheckinIsProcessing: false,
          })
        );
      } else {
        const { helperText, startCheckinIsProcessing, startCheckInError } =
          getInitialState();
        dispatch(
          bhandaraCheckinSlice.actions.setState({
            currentSection: CurrentSectionEnum.UPDATE_DETAILS,
            helperText,
            startCheckinIsProcessing,
            startCheckInError,
            userDetails: getConfiguredUserDetails(
              res.payload as
                | UserWithEmail
                | UserWithMobile
                | UserWithEmailAndMobile
            ),
          })
        );
      }
    } else {
    }
  }
);
