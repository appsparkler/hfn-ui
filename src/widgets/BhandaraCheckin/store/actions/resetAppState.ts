import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import {
  bhandaraCheckinActions,
  mainSectionActions,
  updateDetailsV2Actions,
} from "../slices";

export const resetAppState = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(mainSectionActions.reset());
  dispatch(bhandaraCheckinActions.reset());
  dispatch(updateDetailsV2Actions.reset());
};
