import React, { useEffect } from "react";
import { BarcodeScanner } from "./BarcodeScanner";
import { IQRUser } from "widgets/GSM/model/QRUser";
import { useAppDispatch } from "../redux-app/hooks";
import { successScreenActions } from "../SuccessScreen/successScreenSlice";
import { homeScreenActions } from "../HomeScreen/homeScreenSlice";

export const BarcodeScannerWithVM: React.FC<{
  onCancel: () => void;
  onScan: () => void;
}> = ({ onCancel, onScan }) => {
  const dispatch = useAppDispatch();
  
  const handleScan = (result: string) => {
    const { isValid, user } = isQRValid(result);
    if (isValid && user !== null) {
      dispatch(successScreenActions.setQRUser(user));
      onScan();
    } else {
      alert("QR is not valid");
    }
  };
  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    dispatch(homeScreenActions.resetUserInfo());
    dispatch(successScreenActions.reset());
  }, [dispatch]);

  return <BarcodeScanner onScan={handleScan} onCancel={handleCancel} />;
};

function isQRValid(scanResult: string): {
  isValid: boolean;
  user: IQRUser | null;
} {
  try {
    const rows: string[] = scanResult.split(";");
    const hasRowSizeOfTwo: boolean = rows.length === 3;

    // First Row Validations
    const firstRow: string = rows[0];
    const firstRowColumns: string[] = firstRow.split("|");
    const firstRowHas3Columns: boolean = firstRowColumns.length === 3;
    const eventName: string = firstRowColumns[0].trim();
    const sessionName: string = firstRowColumns[1].trim();
    const pnr: string = firstRowColumns[2].trim();
    const pnrMatchesPattern: boolean =
      /^[A-Z,0-9]{2}-[A-Z,0-9]{4}-[A-Z,0-9]{4}$/.test(pnr);

    // Second Row Validations
    const secondRowColumns: string[] = rows[1].split("|");
    const secondRowHas4Columns: boolean = secondRowColumns.length === 4;
    const registrationId: string = secondRowColumns[0].trim();
    const registrationIdIsValid: boolean =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
        registrationId
      );
    const secondAndThirdColumnsAreBlank: boolean =
      secondRowColumns[1].trim() === "" && secondRowColumns[2].trim() === "";
    const name: string = secondRowColumns[3].trim();
    const thirdRowIsEmptyString: boolean = rows[2].trim() === "";

    const isValid =
      hasRowSizeOfTwo &&
      // First Row Validations
      firstRowHas3Columns &&
      eventName.trim() !== "" &&
      sessionName.trim() !== "" &&
      pnrMatchesPattern &&
      // Second Row Validations
      secondRowHas4Columns &&
      registrationIdIsValid &&
      secondAndThirdColumnsAreBlank &&
      name.trim() !== "" &&
      // Empty third row validation
      thirdRowIsEmptyString;

    return {
      isValid: isValid,
      user: {
        checkinTime: Date.now(),
        eventName,
        name,
        platform: "WEB",
        pnr,
        registrationId,
        sessionName,
        uid: null,
      },
    };
  } catch (error) {
    return {
      isValid: false,
      user: null,
    };
  }
}
