import { Dispatch } from "react";
import { AnyAction } from "redux";
import { UserDetails } from "../../../types";
import { snackbarActions, updateDetailsActions } from "../../index";

export const handleChangeUserDetails =
  (userDetails: UserDetails) => (dispatch: Dispatch<AnyAction>) => {
    dispatch(snackbarActions.closeSnackbar());
    dispatch(
      updateDetailsActions.setState({
        userDetails,
      })
    );
  };
