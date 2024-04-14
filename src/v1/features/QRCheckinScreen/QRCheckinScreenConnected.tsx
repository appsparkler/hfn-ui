import { IQRCheckinCardState } from "v1/model/interfaces/IQRCheckinCardState";
import { QRCheckinScreen } from "./QRCheckinScreen";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "v1/app/hooks";
import {
  checkinWithQR,
  qrCheckinScreenActions,
  selectQRCheckinScreen,
} from "./qrCheckinScreenSlice";
import { every, filter, map } from "lodash/fp";
import { IQRCodeCheckinAPIPayload } from "v1/model/interfaces/api/IQRCodeCheckinAPIPayload";
import { CheckinTypeEnum } from "v1/model/interfaces/CheckinTypeEnum";

const updateQRCheckins = (updatedQRCheckin: IQRCheckinCardState) =>
  map<IQRCheckinCardState, IQRCheckinCardState>((checkin) => {
    if (
      updatedQRCheckin.registrationId === checkin.registrationId &&
      updatedQRCheckin.dormPreference === checkin.dormPreference
    ) {
      return updatedQRCheckin;
    } else {
      return checkin;
    }
  });

const filterSelectedCheckins = filter<IQRCheckinCardState>("isSelected");

const mapCheckinCardsToCheckins = map<
  IQRCheckinCardState,
  IQRCodeCheckinAPIPayload
>((checkinCard) => {
  const { isSelected, ...rest } = checkinCard;
  return {
    ...rest,
    timestamp: Date.now(),
    type: CheckinTypeEnum.QR,
  };
});

export const QRCheckinScreenConnected: React.FC<{
  checkinsFromQR: IQRCheckinCardState[];
  onCancel: () => void;
  onCheckin: () => void;
}> = ({ checkinsFromQR, onCheckin, onCancel }) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectQRCheckinScreen);

  const handleChangeCheckin = (updatedState: IQRCheckinCardState) => {
    const udpatedQRCheckins = updateQRCheckins(updatedState)(state.checkins);
    dispatch(qrCheckinScreenActions.updateCheckins(udpatedQRCheckins));
  };

  const isCheckinDisabled = useMemo(() => {
    return every<IQRCheckinCardState>((checkin) => !checkin.isSelected)(
      state.checkins
    );
  }, [state.checkins]);

  const handleCheckin = () => {
    const selectedCheckins = filterSelectedCheckins(state.checkins);
    dispatch(checkinWithQR(mapCheckinCardsToCheckins(selectedCheckins)));
    onCheckin();
  };

  useEffect(() => {
    dispatch(qrCheckinScreenActions.setupCheckins(checkinsFromQR));
  }, [checkinsFromQR, dispatch]);

  return (
    <QRCheckinScreen
      checkins={state.checkins}
      isCheckinDisabled={isCheckinDisabled}
      onChange={handleChangeCheckin}
      onCheckin={handleCheckin}
      onCancel={onCancel}
    />
  );
};
