import { RouteObject, useNavigate } from "react-router-dom";
import { BarcodeScanner } from "v1/features/BarcodeScanner/BarcodeScanner";
import { appRoutes } from "v1/model/data/routes";
import { QRUtils } from "v1/model/utils/QRUtils/QRUtils";

const qrUtils = new QRUtils();
const Component = () => {
  const navigate = useNavigate();

  const handleScan = (rawValue: string) => {
    if (qrUtils.isQRValid(rawValue)) {
      const checkinsAndMore = qrUtils.getQRCheckinsAndMore(rawValue);
      navigate(appRoutes.SUCCESS_SCREEN, {
        state: checkinsAndMore.checkins,
      });
    }
  };

  const handleDenyPermission = () => {
    navigate(appRoutes.MAIN_SCREEN);
  };

  return (
    <BarcodeScanner
      onScan={handleScan}
      onCancel={handleDenyPermission}
      onDenyPermission={handleDenyPermission}
    />
  );
};

export const scannerRoute: RouteObject = {
  path: appRoutes.SCANNER,
  Component,
};
