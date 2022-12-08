import { Dispatch } from "redux";
import { MapDispatchToProps } from "react-redux";
import {
  ICheckinTileInfo,
  IQREventInfo,
  MultiCheckinScreenDispatchProps,
} from "widgets/BhandaraCheckin/types";
import {
  mainSectionActions,
  multiCheckinScreenActions,
  RootState,
} from "widgets/BhandaraCheckin/store";
import { pageActions } from "widgets/BhandaraCheckin/routing";
import { filter, map, pipe } from "lodash/fp";
import { CheckinTypesEnum, IQRCheckinUser } from "@hfn-checkins/types";

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
    const { userData, eventInfo } = rootState.multiCheckinScreen;
    alert(JSON.stringify(userData, null, 2));
    const apiData = getAPIDataFromCheckinTileInfo(eventInfo)(userData);
    alert(JSON.stringify(apiData, null, 2));
  };

const filterOutUnChecked = filter<ICheckinTileInfo>(
  (checkin) => checkin.checked
);

const mapCheckinTileInfoToApiData = (eventInfo: IQREventInfo) =>
  map<ICheckinTileInfo, IQRCheckinUser>((tileInfo) => ({
    abhyasiId: tileInfo.abhyasiId,
    dormAndBirthAllocation: String(tileInfo.dormAllocation),
    fullName: tileInfo.fullName,
    birthPreference: String(tileInfo.birthPreference || ""),
    dormPreference: String(tileInfo.dormPreference || ""),
    eventName: String(eventInfo.eventName),
    name: String(tileInfo.fullName || ""),
    pnr: String(eventInfo.pnr),
    regId: String(tileInfo.registrationId),
    type: CheckinTypesEnum.QR,
  }));

const getAPIDataFromCheckinTileInfo = (eventInfo: IQREventInfo) =>
  pipe<[ICheckinTileInfo[]], ICheckinTileInfo[], IQRCheckinUser[]>(
    filterOutUnChecked,
    mapCheckinTileInfoToApiData(eventInfo)
  );
