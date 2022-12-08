import { Dispatch } from "redux";
import { MapDispatchToProps } from "react-redux";
import {
  ICheckinTileInfo,
  MultiCheckinScreenDispatchProps,
} from "widgets/BhandaraCheckin/types";
import {
  mainSectionActions,
  multiCheckinScreenActions,
  RootState,
} from "widgets/BhandaraCheckin/store";
import { pageActions } from "widgets/BhandaraCheckin/routing";
import { map } from "lodash/fp";
import { IQRCheckinUser } from "@hfn-checkins/types";

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
    alert(JSON.stringify(userData, null, 2));
    // const apiData = mapCheckinTileInfoToApiData(userData);
  };

// const mapCheckinTileInfoToApiData = map<ICheckinTileInfo, IQRCheckinUser>(tileInfo => ({
//   abhyasiId: tileInfo.abhyasiId,
//   allottedBed: tileInfo.
// }))
