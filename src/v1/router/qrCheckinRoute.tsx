import { RouteObject, useLocation, useNavigate } from "react-router-dom";
import { QRCheckinScreenConnected } from "v1/features/QRCheckinScreen/QRCheckinScreenConnected";
import { appRoutes } from "v1/model/data/routes";
import { IQRCheckinCardState } from "v1/model/interfaces/IQRCheckinCardState";

const Component = () => {
  const { state } = useLocation() as { state: IQRCheckinCardState[] };
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(appRoutes.MAIN_SCREEN);
  };
  const handleCheckin = () => {
    navigate(appRoutes.SUCCESS_SCREEN);
  };
  return (
    <QRCheckinScreenConnected
      checkinsFromQR={state}
      onCancel={handleCancel}
      onCheckin={handleCheckin}
    />
  );
};

export const qrCheckinRoute: RouteObject = {
  path: appRoutes.QR_CHECKIN,
  Component,
};
