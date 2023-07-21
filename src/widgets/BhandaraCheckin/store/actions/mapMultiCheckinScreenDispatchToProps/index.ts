import { Dispatch } from "redux";
import { MapDispatchToProps } from "react-redux";
import {
  ICheckinTileInfo,
  IQREventInfo,
  MultiCheckinScreenDispatchProps,
  PNRType,
} from "widgets/BhandaraCheckin/types";
import {
  mainSectionActions,
  multiCheckinScreenActions,
  RootState,
} from "widgets/BhandaraCheckin/store";
import { pageActions } from "widgets/BhandaraCheckin/routing";
import { filter, map, pipe } from "lodash/fp";
import { CheckinTypesEnum, IQRCheckinUser } from "widgets/BhandaraCheckin/types";
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
    const { userData, eventInfo } = rootState.multiCheckinScreen;
    const apiData = getAPIDataFromCheckinTileInfo(
      eventInfo,
    )(userData);
    dispatch<any>(multiCheckinWithQRCode(apiData));
    dispatch(CHECKIN_SUCCESS());
  };

const filterOutUnChecked = filter<ICheckinTileInfo>(
  (checkin) => checkin.checked
);

const mapCheckinTileInfoToApiData = (eventInfo: IQREventInfo) =>
  map<ICheckinTileInfo, IQRCheckinUser>((tileInfo) => ({
    abhyasiId: tileInfo.abhyasiId,
    orderId: eventInfo.pnrType === PNRType.PAID_ACCOMODATION ? Number(eventInfo.orderId) : undefined,
    session: eventInfo.pnrType === PNRType.FREE_ACCOMODATION ? eventInfo.session : undefined,
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
) =>
  pipe<[ICheckinTileInfo[]], ICheckinTileInfo[], IQRCheckinUser[]>(
    filterOutUnChecked,
    mapCheckinTileInfoToApiData(eventInfo)
  );
