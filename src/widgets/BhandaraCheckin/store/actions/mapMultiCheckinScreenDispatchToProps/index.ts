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
import { multiCheckinWithQRCode } from "../../api-async-thunks";
import { CHECKIN_SUCCESS } from "widgets/BhandaraCheckin/routing/actions/page";
import { batchName } from "widgets/BhandaraCheckin/constants";

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
    // const { selectedBatch } = rootState.mainSection;
    const apiData = getAPIDataFromCheckinTileInfo(
      eventInfo,
      batchName
    )(userData);
    dispatch<any>(multiCheckinWithQRCode(apiData));
    dispatch(CHECKIN_SUCCESS());
  };

const filterOutUnChecked = filter<ICheckinTileInfo>(
  (checkin) => checkin.checked
);

const mapCheckinTileInfoToApiData = (eventInfo: IQREventInfo, batch: string) =>
  map<ICheckinTileInfo, IQRCheckinUser>((tileInfo) => ({
    abhyasiId: tileInfo.abhyasiId,
    dormAndBerthAllocation: String(tileInfo.dormAllocation),
    fullName: tileInfo.fullName,
    berthPreference: String(tileInfo.berthPreference || ""),
    dormPreference: String(tileInfo.dormPreference || ""),
    eventName: String(eventInfo.eventName),
    name: String(tileInfo.fullName || ""),
    pnr: String(eventInfo.pnr),
    regId: String(tileInfo.registrationId),
    type: CheckinTypesEnum.QR,
  }));

const getAPIDataFromCheckinTileInfo = (
  eventInfo: IQREventInfo,
  batch: string
) =>
  pipe<[ICheckinTileInfo[]], ICheckinTileInfo[], IQRCheckinUser[]>(
    filterOutUnChecked,
    mapCheckinTileInfoToApiData(eventInfo, batch)
  );
