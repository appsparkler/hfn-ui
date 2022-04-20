import { createAsyncThunk } from "@reduxjs/toolkit";
import { snackbarSlice } from "../../../../components/Snackbar/snackbarSlice";
import { UserDetails } from "../../types";
import { postAttendance } from "../../store/api-async-thunks";
import { RootState, ThunkApiConfig } from "../../store/index";
import { bhandaraCheckinSlice } from "../../store/slices";

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
        city_id: location.value?.c_id,
        gender: gender.value,
        ...getEmailValue(userDetails),
        ...getMobileValue(userDetails),
      })
    );
    if (res.meta.requestStatus === "rejected") {
      dispatch(
        snackbarSlice.actions.openSnackbar({
          children: res.payload as string,
        })
      );
    } else {
      dispatch(bhandaraCheckinSlice.actions.goToCheckinSuccess());
    }
  }
);
