import {
  CheckinEmailOrMobileUserDetails,
  GenderType,
} from "@hfn-checkins/types";
import { MapDispatchToProps } from "react-redux";
import { SectionUpdateDetailsDispatchProps } from "widgets/BhandaraCheckin/components/SectionUpdateDetails/SectionUpdateDetails";
import { pageActions } from "widgets/BhandaraCheckin/routing";
import { FormUserDetails, ThunkApiConfig } from "widgets/BhandaraCheckin/types";
import { RootState } from "../..";
import {
  checkinWithEmailOrMobile,
  isUserCheckedIn,
} from "../../api-async-thunks";
import {
  mainSectionActions,
  snackbarActions,
  updateDetailsActions,
} from "../../slices";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateDetailsSectionMapDispatchToProps: MapDispatchToProps<
  SectionUpdateDetailsDispatchProps,
  {}
> = (dispatch) => ({
  onChange: (userDetails) => {
    dispatch(updateDetailsActions.setState({ userDetails }));
  },
  onClickCancel: () => {
    dispatch(mainSectionActions.reset());
    dispatch(pageActions.HOME());
  },
  onClickCheckin: async ($userDetails) => {
    await dispatch<any>(onClickCheckinAction($userDetails));
  },
});

const onClickCheckinAction = createAsyncThunk<
  any,
  FormUserDetails,
  ThunkApiConfig
>(
  "updateDetailsSectionMapDispatchToProps/onClickCheckin",
  async ($userDetails, { dispatch, getState }) => {
    const {
      ageGroup,
      email,
      fullName,
      gender,
      city,
      state,
      country,
      mobile,
      dormAndBirthAllocation,
    } = $userDetails;

    const { selectedBatch } = (getState() as RootState).mainSection;

    const userDetails: CheckinEmailOrMobileUserDetails = {
      ageGroup: String(ageGroup.value),
      email: String(email.value?.toLowerCase()),
      gender: String(gender.value) as GenderType,
      city: String(city.value?.toUpperCase()),
      state: String(state.value?.toUpperCase()),
      country: String(country.value?.toUpperCase()),
      mobile: String(mobile.value),
      fullName: String(fullName.value?.toUpperCase()),
      dormAndBirthAllocation: String(dormAndBirthAllocation.value),
      batch: String(selectedBatch),
    };
    const isUserCheckedInRes = await dispatch<any>(
      isUserCheckedIn(userDetails)
    );
    if (isUserCheckedInRes.meta.requestStatus === "rejected") {
      dispatch(
        snackbarActions.openSnackbar({
          children: isUserCheckedInRes.payload,
        })
      );
    } else {
      const res = await dispatch<any>(checkinWithEmailOrMobile(userDetails));
      if (res.meta.requestStatus === "fulfilled") {
        if (res.payload) {
          dispatch(pageActions.CHECKIN_SUCCESS());
        } else {
          dispatch(
            snackbarActions.openSnackbar({
              children: "Request Failed",
            })
          );
        }
      } else if (res.meta.requestStatus === "rejected") {
        dispatch(
          snackbarActions.openSnackbar({
            children: "Server Error",
          })
        );
      }
    }
  }
);
