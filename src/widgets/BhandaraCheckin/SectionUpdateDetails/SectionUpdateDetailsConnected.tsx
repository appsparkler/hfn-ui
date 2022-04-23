import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState, updateDetailsCheckin } from "../store";
import {
  SectionUpdateDetails,
  SectionUpdateDetailsDispatchProps,
  SectionUpdateDetailsStateProps,
} from "./SectionUpdateDetails";
import { snackbarSlice } from "../../../components/Snackbar/snackbarSlice";
import { updateDetailsActions, resetAppState } from "../store";

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
      dispatch(snackbarSlice.actions.closeSnackbar());
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
