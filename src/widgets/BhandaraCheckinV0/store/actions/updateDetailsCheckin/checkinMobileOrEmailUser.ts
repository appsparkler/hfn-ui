import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserDetails } from "../../../types";
import { postAttendance } from "../../api-async-thunks";
import { RootState, ThunkApiConfig } from "../../index";
import { bhandaraCheckinActions, snackbarActions } from "../../slices";

const getEmailValue = (userDetails: UserDetails): { email?: string } => {
  if (!userDetails.email.value) return {};
  return {
    email: userDetails.email.value,
  };
};

const getMobileValue = (userDetails: UserDetails): { mobile?: string } => {
  if (!userDetails.mobile.value) return {};
  return {
    mobile: userDetails.mobile.value,
  };
};

export const handleCheckinMobileOrEmailUser = createAsyncThunk<
  void,
  undefined,
  ThunkApiConfig
>(
  "bhandara-checkin/checkin-mobile-or-email-user",
  async (_, { getState, dispatch }) => {
    const {
      updateDetailsSection: { userDetails },
    } = getState() as RootState;
    const { fullName, ageGroup, location, gender } = userDetails;
    const res = await dispatch(
      postAttendance({
        name: String(fullName.value),
        age_group: ageGroup.value,
        city_id: location.value?.id,
        gender: gender.value,
        ...getEmailValue(userDetails),
        ...getMobileValue(userDetails),
      })
    );
    if (res.meta.requestStatus === "rejected") {
      dispatch(
        snackbarActions.openSnackbar({
          children: res.payload as string,
        })
      );
    } else {
      dispatch(bhandaraCheckinActions.goToCheckinSuccess());
    }
  }
);
