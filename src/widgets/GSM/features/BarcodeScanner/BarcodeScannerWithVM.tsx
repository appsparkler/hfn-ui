import React from "react";
import { BarcodeScanner } from "./BarcodeScanner";

export const BarcodeScannerWithVM: React.FC<{
  onCancel: () => void;
  onScan: () => void;
}> = ({ onCancel, onScan }) => {
  const handleScan = (result: string) => {
    alert(result);
    onScan();
  };
  const handleCancel = () => {
    onCancel();
  };
  return <BarcodeScanner onScan={handleScan} onCancel={handleCancel} />;
};
