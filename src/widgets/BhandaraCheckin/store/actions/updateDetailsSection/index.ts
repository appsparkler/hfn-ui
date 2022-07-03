import { MapDispatchToProps } from "react-redux";
import { SectionUpdateDetailsDispatchProps } from "widgets/BhandaraCheckin/components/SectionUpdateDetails/SectionUpdateDetails";
import { CHECKIN_SUCCESS, HOME } from "widgets/BhandaraCheckin/routing";
import { CheckinEmailOrMobileUserDetails } from "widgets/BhandaraCheckin/types";
import { checkinWithEmailOrMobile } from "../../api-async-thunks";
import {
  mainSectionActions,
  snackbarActions,
  updateDetailsV2Actions,
} from "../../slices";

export const updateDetailsSectionMapDispatchToProps: MapDispatchToProps<
  SectionUpdateDetailsDispatchProps,
  {}
> = (dispatch) => ({
  onChange: (userDetails) => {
    dispatch(updateDetailsV2Actions.setState({ userDetails }));
  },
  onClickCancel: () => {
    dispatch(mainSectionActions.reset());
    dispatch(HOME());
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
      email: String(email.value),
      gender: String(gender.value),
      location: String(location.value),
      mobile: String(mobile.value),
      name: String(fullName.value),
    };
    const res = await dispatch<any>(checkinWithEmailOrMobile(userDetails));
    if (res.meta.requestStatus === "fulfilled") {
      if (res.payload) {
        dispatch(CHECKIN_SUCCESS());
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
  },
});
