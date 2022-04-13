import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAbhyasiId as isAbhyasiIdUtil } from "./utils";
import { RootState } from "../index";
import {
  bhandaraCheckinSlice,
  getInitialState,
  ThunkApiConfig,
} from "../slices/bhandara-checkin";
import {
  CurrentSectionEnum,
  UserWithEmail,
  UserWithEmailAndMobile,
  UserWithMobile,
} from "../../types";
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
    const { value } = bhandaraCheckin.mainSection;
    dispatch(
      bhandaraCheckinSlice.actions.setState({
        isProcessing: true,
      })
    );
    const isAbhyasiId = isAbhyasiIdUtil(value);
    if (isAbhyasiId) {
      const res = await dispatch(getAbhyasiData(value));
      if (res.meta.requestStatus === "rejected") {
        dispatch(
          bhandaraCheckinSlice.actions.setMainSectionState({
            helperText: res.payload as string,
            error: true,
            isProcessing: false,
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
