import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, ThunkApiConfig } from "../../store";
import { snackbarSlice } from "../../../../components/Snackbar/snackbarSlice";
import { postAttendance } from "../../store/api-async-thunks";
import { UserDetails } from "../../types";
import { RefinedCityStateCountryLocation } from "../../../../components/LocationTextField/locations";
import { updateDetailsSectionSlice } from "../updateDetailsSectionSlice";
import { bhandaraCheckinSlice } from "../../BhandaraCheckin/bhandaraCheckinSlice";

const getEmailValue = (userDetails: UserDetails): { email?: string } => {
  if (userDetails.email.value?.match(/\*/)) {
    return {};
  }
  if (!userDetails.email.value) return {};
  return {
    email: userDetails.email.value.toLowerCase(),
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

const getGenderValue = (userDetails: UserDetails): { gender?: string } => {
  if (userDetails.gender.value?.match(/\*/)) {
    return {};
  }
  if (!userDetails.gender.value) return {};
  return {
    gender: String(userDetails.gender.value),
  };
};

const getCityId = (userDetails: UserDetails): { city_id?: number } => {
  return {
    city_id: (userDetails.location.value as RefinedCityStateCountryLocation)
      .c_id,
  };
};

export const checkinAbhyasi = createAsyncThunk<
  boolean,
  undefined,
  ThunkApiConfig
>(
  `${updateDetailsSectionSlice.name}/checkinAbhyasi`,
  async (_, { getState, dispatch, rejectWithValue }) => {
    const {
      updateDetailsSection: { userDetails },
      mainSection: { value },
    } = getState() as RootState;
    const res = await dispatch(
      postAttendance({
        ref: value.toUpperCase(),
        name: String(userDetails.fullName.value),
        ...getCityId(userDetails),
        ...getEmailValue(userDetails),
        ...getMobileValue(userDetails),
        ...getAgeGroupValue(userDetails),
        ...getGenderValue(userDetails),
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
