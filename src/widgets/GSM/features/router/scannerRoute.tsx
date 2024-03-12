import { RouteObject, useNavigate } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { BarcodeScannerWithVM } from "../BarcodeScanner/BarcodeScannerWithVM";

export const scannerRoute: RouteObject = {
  path: AppRoutes.SCANNER_SCREEN,
  Component() {
    const navigate = useNavigate();

    const handleCancel = () => {
      navigate(AppRoutes.HOME_SCREEN, { replace: true });
    };

    const handleScan = () => {
      navigate(AppRoutes.SUCCESS_SCREEN, { replace: true });
    };

    return <BarcodeScannerWithVM onCancel={handleCancel} onScan={handleScan} />;
  },
};
