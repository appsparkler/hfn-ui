import { RouteObject, useLocation, useNavigate } from "react-router-dom";
import { BarcodeScanner } from "v1/features/BarcodeScanner/BarcodeScanner";
import { appRoutes } from "v1/model/data/routes";
import { ILocationState } from "v1/model/interfaces/ILocationState";
import { QRUtils } from "v1/model/utils/QRUtils/QRUtils";
import { isValidAbhyasiId } from "v1/model/utils/validations";

const qrUtils = new QRUtils();
const Component = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: { batch: string } };

  const handleScan = (rawValue: string) => {
    if (qrUtils.isQRValid(rawValue)) {
      const checkinsAndMore = qrUtils.getQRCheckinsAndMore(rawValue);
      navigate(appRoutes.QR_CHECKIN, {
        state: checkinsAndMore.checkins,
      });
    } else if (isValidAbhyasiId(rawValue)) {
      navigate(appRoutes.ABHYASI_ID_CHECKIN, {
        state: {
          batch: state.batch,
          inputValue: rawValue,
        } as ILocationState,
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
