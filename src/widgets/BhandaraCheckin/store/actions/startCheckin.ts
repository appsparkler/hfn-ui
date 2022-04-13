import { createAsyncThunk } from "@reduxjs/toolkit";
import { canCheckinDirectly, isAbhyasiId as isAbhyasiIdUtil } from "./utils";
import { RootState, ThunkApiConfig } from "../index";
import { bhandaraCheckinSlice } from "../slices/bhandara-checkin";
import {
  User,
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

export const checkinMobileOrEmailUser = createAsyncThunk<
  boolean,
  User,
  ThunkApiConfig
>("widget/checkin-user", async (user, { extra: { apis }, rejectWithValue }) => {
  try {
    const checkinStatus = await apis.checkinMobileOrEmailUser(
      user as UserWithEmailAndMobile
    );
    return checkinStatus;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const resetAppState = createAsyncThunk<void, undefined, ThunkApiConfig>(
  "widget/reset-state",
  (_, { dispatch }) => {
    dispatch(mainSectionSlice.actions.reset());
    dispatch(bhandaraCheckinSlice.actions.reset());
    dispatch(updateDetailsSectionSlice.actions.reset());
  }
);

export const checkinUser = createAsyncThunk<void, User, ThunkApiConfig>(
  "widget/checkinUser",
  async (user, { dispatch, extra: { apis } }) => {
    try {
      const checkinSuccess = await apis.checkinMobileOrEmailUser(user);
      if (checkinSuccess) {
        dispatch(bhandaraCheckinSlice.actions.goToCheckinSuccess());
      } else {
      }
    } catch (error) {}
  }
);

const continueCheckinAbhyasi = createAsyncThunk<void, string, ThunkApiConfig>(
  "widget/continue-checkin-abhyasi",
  async (abhyasiId, { dispatch, extra: { apis } }) => {
    try {
      const abhyasiData = await apis.getAbhyasiData(abhyasiId);
      if (canCheckinDirectly(abhyasiData)) {
        dispatch(checkinUser(abhyasiData));
      }
    } catch (error) {
      dispatch(
        mainSectionSlice.actions.setState({
          helperText: (error as Error).message,
          error: true,
          isProcessing: false,
        })
      );
    }
  }
);

export const startCheckinAbhyasi = createAsyncThunk<
  void,
  string,
  ThunkApiConfig
>(
  "widget/start-checkin-abhyasi",
  async (abhyasiId, { dispatch, extra: { apis } }) => {
    try {
      const isAbhyasiCheckedIn = await apis.isAbhyasiCheckedIn(abhyasiId);
      if (isAbhyasiCheckedIn)
        dispatch(
          mainSectionSlice.actions.setState({
            error: true,
            helperText: `Abhyasi with ID ${abhyasiId} is already checked in.`,
            isProcessing: false,
          })
        );
      else {
        dispatch(continueCheckinAbhyasi(abhyasiId));
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch(
        mainSectionSlice.actions.setState({
          error: true,
          helperText: errorMessage,
          isProcessing: false,
        })
      );
    }
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
      dispatch(startCheckinAbhyasi(value));
      // const res = await dispatch(getAbhyasiData(value));
      // if (res.meta.requestStatus === "rejected") {
      //   // dispatch(
      //   //   mainSectionSlice.actions.setState({
      //   //     helperText: res.payload as string,
      //   //     error: true,
      //   //     isProcessing: false,
      //   //   })
      //   // );
      // } else {
      //   // const { helperText, startCheckinIsProcessing, startCheckInError } =
      //   //   getInitialState();
      //   dispatch(
      //     mainSectionSlice.actions.setState({
      //       // currentSection: CurrentSectionEnum.UPDATE_DETAILS,
      //       helperText: "",
      //       isProcessing: false,
      //       error: false,
      //     })
      //   );
      //   if (canCheckinDirectly(res.payload as User)) {
      //     alert("checkin directly");
      //   } else {
      //     dispatch(
      //       updateDetailsSectionSlice.actions.setState({
      //         userDetails: getConfiguredUserDetails(
      //           res.payload as
      //             | UserWithEmail
      //             | UserWithMobile
      //             | UserWithEmailAndMobile
      //         ),
      //       })
      //     );
      //     dispatch(bhandaraCheckinSlice.actions.goToUpdateDetails());
      //   }
      // }
    } else {
    }
  }
);
