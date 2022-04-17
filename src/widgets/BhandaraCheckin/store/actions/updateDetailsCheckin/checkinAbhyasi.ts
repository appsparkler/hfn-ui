import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, ThunkApiConfig } from "../..";
import { snackbarSlice } from "../../../../../components/Snackbar/snackbarSlice";
import { bhandaraCheckinSlice } from "../../slices";
import { getBhandaraCheckinActionName } from "../../utils";
import { postAttendance } from "../../api-async-thunks";
import { UserDetails } from "../../../types";

const getEmailValue = (userDetails: UserDetails): { email?: string } => {
  if (userDetails.email.value?.match(/\*/)) {
    return {};
  }
  if (!userDetails.email.value) return {};
  return {
    email: userDetails.email.value,
  };
};

const getMobileValue = (userDetails: UserDetails): { mobile?: string } => {
  if (userDetails.mobile.value?.match(/\*/)) {
    return {};
  }
  if (!userDetails.mobile.value) return {};
  return {
    mobile: userDetails.mobile.value,
  };
};
const getAgeGroupValue = (userDetails: UserDetails): { age_group?: string } => {
  if (userDetails.ageGroup.value?.match(/\*/)) {
    return {};
  }
  if (!userDetails.ageGroup.value) return {};
  return {
    age_group: userDetails.ageGroup.value,
  };
};
export const checkinAbhyasi = createAsyncThunk<
  boolean,
  undefined,
  ThunkApiConfig
>(
  getBhandaraCheckinActionName("update-details-checkin-abhyasi"),
  async (_, { getState, dispatch, rejectWithValue }) => {
    const {
      updateDetailsSection: { userDetails },
      mainSection: { value },
    } = getState() as RootState;
    const res = await dispatch(
      postAttendance({
        ref: value.toUpperCase(),
        name: String(userDetails.fullName.value),
        age_group: userDetails.ageGroup.value,
        city_id: userDetails.location.show
          ? userDetails.location.value?.c_id
          : (userDetails.location.value as unknown as number),
        ...getEmailValue(userDetails),
        ...getMobileValue(userDetails),
        ...getAgeGroupValue(userDetails),
      })
    );
    if (res.meta.requestStatus === "rejected") {
      dispatch(
        snackbarSlice.actions.openSnackbar({
          children: res.payload as string,
        })
      );
      return rejectWithValue("could not post attendance");
    } else {
      dispatch(bhandaraCheckinSlice.actions.goToCheckinSuccess());
      return true;
    }
  }
);
