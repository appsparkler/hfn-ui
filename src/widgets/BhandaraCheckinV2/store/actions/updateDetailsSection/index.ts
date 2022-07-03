import { MapDispatchToProps } from "react-redux";
import { SectionUpdateDetailsDispatchProps } from "widgets/BhandaraCheckinV2/SectionUpdateDetailsV2/SectionUpdateDetailsV2";
import { CheckinEmailOrMobileUserDetails } from "widgets/BhandaraCheckinV2/types";
import { checkinWithEmailOrMobile } from "../../api-async-thunks";
import {
  bhandaraCheckinActions,
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
    dispatch(bhandaraCheckinActions.goToMain());
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
        dispatch(bhandaraCheckinActions.goToCheckinSuccess());
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
