import { IQRCheckinCardState } from "v1/model/interfaces/IQRCheckinCardState";
import { QRCheckinScreen } from "./QRCheckinScreen";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "v1/app/hooks";
import {
  qrCheckinScreenActions,
  selectQRCheckinScreen,
} from "./qrCheckinScreenSlice";
import { every } from "lodash/fp";

export const QRCheckinScreenConnected: React.FC<{
  checkinsFromQR: IQRCheckinCardState[];
}> = ({ checkinsFromQR }) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectQRCheckinScreen);

  const handleChangeCheckin = (updatedState: IQRCheckinCardState) => {
    dispatch(qrCheckinScreenActions.updateCheckins(updatedState));
  };

  const isCheckinDisabled = useMemo(() => {
    return every<IQRCheckinCardState>((checkin) => !checkin.isSelected)(
      state.checkins
    );
  }, [state.checkins]);

  useEffect(() => {
    dispatch(qrCheckinScreenActions.setupCheckins(checkinsFromQR));
  }, [checkinsFromQR, dispatch]);

  return (
    <QRCheckinScreen
      checkins={state.checkins}
      isCheckinDisabled={isCheckinDisabled}
      onChange={handleChangeCheckin}
      onCheckin={function (): void {
        throw new Error("Function not implemented.");
      }}
      onCancel={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};
