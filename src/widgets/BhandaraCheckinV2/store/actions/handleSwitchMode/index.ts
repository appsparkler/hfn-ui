import { Dispatch } from "react";
import { AnyAction } from "redux";
import { modeActions } from "../../slices";

export const handleSwitchMode =
  (checked: boolean) => (dispatch: Dispatch<AnyAction>) => {
    if (checked) {
      dispatch(modeActions.setDarkTheme());
    } else {
      dispatch(modeActions.setLightTheme());
    }
  };
