import { createAsyncThunk } from "@reduxjs/toolkit";
import { MapDispatchToProps } from "react-redux";
import { Action, Dispatch } from "redux";
import { pageActions } from "widgets/BhandaraCheckin/routing";
import {
  IAbhyasiIDCheckinScreenDispatchProps,
  ThunkApiConfig,
} from "widgets/BhandaraCheckin/types";
import {
  checkinWithAbhyasiId,
  isAbhyasiCheckedIn,
} from "../../api-async-thunks";
import { mainSectionActions, snackbarActions } from "../../slices";
import { abhyasiIdCheckinScreenActions } from "../../slices/abhyasiIdCheckinScreen";
import { RootState } from "../../index";
import { ErrorCodes } from "widgets/BhandaraCheckin/constants";
import { errorAbhyasiAlreadyCheckedin } from "widgets/BhandaraCheckin/utils";

const handleCheckinWithAbhyasiId = createAsyncThunk<
  void,
  undefined,
  ThunkApiConfig
>("handleAbhyasiIDCheckin", async (_, { getState, dispatch }) => {
  const rootState = getState() as unknown as RootState;
  const { abhyasiId, dormAndBirthAllocation } =
    rootState.abhyasiIdCheckinScreen;
  const isCheckedInRes = await dispatch<any>(isAbhyasiCheckedIn(abhyasiId));
  if (isCheckedInRes.meta.requestStatus === "rejected") {
    if (isCheckedInRes.payload === ErrorCodes.ABHYASI_ALREADY_CHECKED_IN) {
      const errorAction = mainSectionActions.setError(
        errorAbhyasiAlreadyCheckedin(abhyasiId)
      );
      dispatch(errorAction);
    }
  } else {
    const res = await dispatch<any>(
      checkinWithAbhyasiId({ abhyasiId, dormAndBirthAllocation })
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
  }
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

      // const isCheckedInRes = await dispatch<any>(isAbhyasiCheckedIn(abhyasiId));
      // if (isCheckedInRes.meta.requestStatus === "rejected") {
      //   if (isCheckedInRes.payload === ErrorCodes.ABHYASI_ALREADY_CHECKED_IN) {
      //     const errorAction = mainSectionActions.setError(
      //       errorAbhyasiAlreadyCheckedin(abhyasiId)
      //     );
      //     dispatch(errorAction);
      //   }
      // } else {
      //   const res = await dispatch<any>(checkinWithAbhyasiId(abhyasiId));
      //   if (res.meta.requestStatus === "fulfilled") {
      //     // dispatch(pageActions.CHECKIN_SUCCESS());
      //   } else {
      //     dispatch(
      //       snackbarActions.openSnackbar({
      //         children: ErrorCodes.SERVER_ERROR,
      //       })
      //     );
      //   }
      // }
    },
    onChangeDormAndBirthAllocation: ({ target: { value } }) => {
      dispatch(abhyasiIdCheckinScreenActions.setDormAndBirthAllocation(value));
    },
  };
};
