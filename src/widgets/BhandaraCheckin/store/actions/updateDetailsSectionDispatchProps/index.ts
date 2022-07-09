import { MapDispatchToProps } from "react-redux";
import { SectionUpdateDetailsDispatchProps } from "widgets/BhandaraCheckin/components/SectionUpdateDetails/SectionUpdateDetails";
import { pageActions } from "widgets/BhandaraCheckin/routing";
import { CheckinEmailOrMobileUserDetails } from "widgets/BhandaraCheckin/types";
import {
  checkinWithEmailOrMobile,
  isUserCheckedIn,
} from "../../api-async-thunks";
import {
  mainSectionActions,
  snackbarActions,
  updateDetailsActions,
} from "../../slices";

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
  onClickCheckin: async ({
    ageGroup,
    email,
    fullName,
    gender,
    location,
    mobile,
  }) => {
    const userDetails: CheckinEmailOrMobileUserDetails = {
      ageGroup: String(ageGroup.value),
      email: String(email.value?.toLowerCase()),
      gender: String(gender.value),
      location: String(location.value?.toUpperCase()),
      mobile: String(mobile.value),
      name: String(fullName.value?.toUpperCase()),
    };
    dispatch(updateDetailsActions.startProcessing());
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
    dispatch(updateDetailsActions.stopProcessing());
  },
});
