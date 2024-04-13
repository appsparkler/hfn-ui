import { RouteObject, useLocation } from "react-router-dom";
import { QRCheckinScreen } from "v1/features/QRCheckinScreen/QRCheckinScreen";
import { appRoutes } from "v1/model/data/routes";
import { IQRCheckinCardState } from "v1/model/interfaces/IQRCheckinCardState";

const Component = () => {
  const { state } = useLocation() as { state: IQRCheckinCardState[] };
  return (
    <QRCheckinScreen
      checkins={state}
      isCheckinDisabled={false}
      onChange={function (updatedState: IQRCheckinCardState): void {
        throw new Error("Function not implemented.");
      }}
      onCheckin={function (): void {
        throw new Error("Function not implemented.");
      }}
      onCancel={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};

export const qrCheckinRoute: RouteObject = {
  path: appRoutes.QR_CHECKIN,
  Component,
};
