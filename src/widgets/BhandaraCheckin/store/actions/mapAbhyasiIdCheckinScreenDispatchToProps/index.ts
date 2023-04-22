import { createAsyncThunk } from "@reduxjs/toolkit";
import { MapDispatchToProps } from "react-redux";
import { Action, Dispatch } from "redux";
import { pageActions } from "widgets/BhandaraCheckin/routing";
import {
  IAbhyasiIDCheckinScreenDispatchProps,
  ThunkApiConfig,
} from "widgets/BhandaraCheckin/types";
import { checkinWithAbhyasiId } from "../../api-async-thunks";
import { mainSectionActions, snackbarActions } from "../../slices";
import { abhyasiIdCheckinScreenActions } from "../../slices/abhyasiIdCheckinScreen";
import { RootState } from "widgets/BhandaraCheckin/store";
import { ErrorCodes, textStrings } from "widgets/BhandaraCheckin/constants";

const handleCheckinWithAbhyasiId = createAsyncThunk<
  void,
  undefined,
  ThunkApiConfig
>("handleAbhyasiIDCheckin", async (_, { getState, dispatch }) => {
  const rootState = getState() as unknown as RootState;
  const { abhyasiId, dormAndBerthAllocation } =
    rootState.abhyasiIdCheckinScreen;
  const res = await dispatch<any>(
    checkinWithAbhyasiId({
      abhyasiId,
      dormAndBerthAllocation,
      batch: textStrings.batchName,
    })
  );
  if (res.meta.requestStatus === "fulfilled") {
    dispatch(pageActions.CHECKIN_SUCCESS());
  } else {
    dispatch(
      snackbarActions.openSnackbar({
        children: ErrorCodes.SERVER_ERROR,
      })
    );
  }

  // const isCheckedInRes = await dispatch<any>(isAbhyasiCheckedIn(abhyasiId));
  // if (isCheckedInRes.meta.requestStatus === "rejected") {
  //   alert("checking in with abhyasi id");
  //   if (isCheckedInRes.payload === ErrorCodes.ABHYASI_ALREADY_CHECKED_IN) {
  //     const errorAction = mainSectionActions.setError(
  //       errorAbhyasiAlreadyCheckedin(abhyasiId)
  //     );
  //     dispatch(errorAction);
  //   }
  // } else {

  // }
});

export const mapAbhyasiIDCheckinScreenDispatchToProps: MapDispatchToProps<
  IAbhyasiIDCheckinScreenDispatchProps,
  {}
> = (dispatch: Dispatch<Action<any>>) => {
  return {
    onCancel: () => {
      dispatch(mainSectionActions.reset());
      dispatch(pageActions.HOME());
    },
    onCheckin: () => {
      dispatch<any>(handleCheckinWithAbhyasiId());
    },
    onChangeDormAndBerthAllocation: ({ target: { value } }) => {
      dispatch(abhyasiIdCheckinScreenActions.setDormAndBerthAllocation(value));
    },
  };
};
