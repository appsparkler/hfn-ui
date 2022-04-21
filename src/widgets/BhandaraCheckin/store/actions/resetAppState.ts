import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { bhandaraCheckinSlice } from "../../BhandaraCheckin/bhandaraCheckinSlice";
import { mainSectionSlice } from "../../SectionMain/mainSectionSlice";
import { updateDetailsSectionSlice } from "../../SectionUpdateDetails/updateDetailsSectionSlice";

export const resetAppStateAction = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(mainSectionSlice.actions.reset());
  dispatch(bhandaraCheckinSlice.actions.reset());
  dispatch(updateDetailsSectionSlice.actions.reset());
};
