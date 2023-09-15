import { Dispatch } from "redux";
import { MapDispatchToProps } from "react-redux";
import {
  CheckinTypesEnum,
  MultiCheckinScreenDispatchProps,
} from "widgets/BhandaraCheckin/types";
import {
  mainSectionActions,
  multiCheckinScreenActions,
  RootState,
} from "widgets/BhandaraCheckin/store";
import { pageActions } from "widgets/BhandaraCheckin/routing";
import { multiCheckinWithQRCode } from "../../api-async-thunks";
import { CHECKIN_SUCCESS } from "widgets/BhandaraCheckin/routing/actions/page";

export const mapMultiCheckinScreenDispatchToProps: MapDispatchToProps<
  MultiCheckinScreenDispatchProps,
  {}
> = (dispatch: Dispatch) => ({
  onChangeData: (checkins) => {
    dispatch(multiCheckinScreenActions.setUserData(checkins));
  },
  onClickCancel: () => {
    dispatch(mainSectionActions.reset());
    dispatch(pageActions.HOME());
  },
  onClickCheckin: () => {
    dispatch<any>(onClickCheckinAction());
  },
});

const onClickCheckinAction =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    const rootState = getState();
    const { userData } = rootState.multiCheckinScreen;
    dispatch<any>(
      multiCheckinWithQRCode(
        userData
          .filter(({ checkin }) => checkin)
          .map(({ checkin, ...restUserData }) => ({
            ...restUserData,
            type: CheckinTypesEnum.QR,
          }))
      )
    );
    dispatch(CHECKIN_SUCCESS());
  };
