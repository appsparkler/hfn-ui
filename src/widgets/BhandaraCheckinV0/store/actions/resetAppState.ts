import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import {
  bhandaraCheckinActions,
  mainSectionActions,
  updateDetailsActions,
} from "../slices";

export const resetAppState = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(mainSectionActions.reset());
  dispatch(bhandaraCheckinActions.reset());
  dispatch(updateDetailsActions.reset());
};
