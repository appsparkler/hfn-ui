import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAbhyasiId as isAbhyasiIdUtil } from "./utils";
import { RootState, ThunkApiConfig } from "../index";
import { bhandaraCheckinSlice } from "../slices/bhandara-checkin";
import {
  UserWithEmail,
  UserWithEmailAndMobile,
  UserWithMobile,
} from "../../types";
import { getConfiguredUserDetails } from "./utils";
import { mainSectionSlice } from "../slices/mainSectionSlice";
import { updateDetailsSectionSlice } from "../slices/updateDetailsSectionSlice";

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

export const resetAppState = createAsyncThunk<void, undefined, ThunkApiConfig>(
  "widget/reset-state",
  (_, { dispatch }) => {
    dispatch(mainSectionSlice.actions.reset());
    dispatch(bhandaraCheckinSlice.actions.reset());
    dispatch(updateDetailsSectionSlice.actions.reset());
  }
);

export const startCheckin = createAsyncThunk<void, undefined, ThunkApiConfig>(
  "bhandara-checkin/start-checkin",
  async (_, { extra: { apis }, dispatch, getState }) => {
    const { mainSection } = getState() as RootState;
    const { value } = mainSection;
    dispatch(
      mainSectionSlice.actions.setState({
        isProcessing: true,
      })
    );
    const isAbhyasiId = isAbhyasiIdUtil(value);
    if (isAbhyasiId) {
      const res = await dispatch(getAbhyasiData(value));
      if (res.meta.requestStatus === "rejected") {
        dispatch(
          mainSectionSlice.actions.setState({
            helperText: res.payload as string,
            error: true,
            isProcessing: false,
          })
        );
      } else {
        // const { helperText, startCheckinIsProcessing, startCheckInError } =
        //   getInitialState();
        dispatch(
          mainSectionSlice.actions.setState({
            // currentSection: CurrentSectionEnum.UPDATE_DETAILS,
            helperText: "",
            isProcessing: false,
            error: false,
          })
        );
        dispatch(
          updateDetailsSectionSlice.actions.setState({
            userDetails: getConfiguredUserDetails(
              res.payload as
                | UserWithEmail
                | UserWithMobile
                | UserWithEmailAndMobile
            ),
          })
        );
        dispatch(bhandaraCheckinSlice.actions.goToUpdateDetails());
      }
    } else {
    }
  }
);
