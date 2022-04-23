import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import {
  SectionUpdateDetails,
  SectionUpdateDetailsDispatchProps,
  SectionUpdateDetailsStateProps,
} from "./SectionUpdateDetails";
import {
  updateDetailsActions,
  snackbarActions,
  resetAppState,
  RootState,
  updateDetailsCheckin,
} from "../store";

const mapStateToProps: MapStateToProps<
  SectionUpdateDetailsStateProps,
  {},
  RootState
> = ({ updateDetailsSection }) => updateDetailsSection;

const mapDispatchToProps: MapDispatchToProps<
  SectionUpdateDetailsDispatchProps,
  {}
> = (dispatch) => {
  return {
    onClickCheckin: () => {
      dispatch<any>(updateDetailsCheckin());
    },
    onClickCancel: () => {
      resetAppState(dispatch);
    },
    onChange: (userDetails) => {
      dispatch(snackbarActions.closeSnackbar());
      dispatch(
        updateDetailsActions.setState({
          userDetails,
        })
      );
    },
  };
};

export const SectionUpdateDetailsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionUpdateDetails);
