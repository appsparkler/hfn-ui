import { ComponentMeta } from "@storybook/react";
import { ChangeEvent, useState } from "react";
import { BarcodeScanner } from "./BarcodeScanner";

import { Vertical } from "components";
import { Switch } from "@mui/material";

export default {
  title: "Widgets/GSM/features/Barcode Scanner",
  component: BarcodeScanner,
} as ComponentMeta<typeof BarcodeScanner>;

export const BarcodeScannerStory = (args: any) => {
  const [show, setShow] = useState(false);

  const handleScan = (text: string) => {
    alert(text);
  };

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void {
    setShow(checked);
  }

  return (
    <Vertical>
      <Switch onChange={handleChange} />
      {show && (
        <BarcodeScanner
          onScan={handleScan}
          onCancel={args.onCancel}
          onDenyPermission={args.onDenyPermission}
        />
      )}
    </Vertical>
  );
};
BarcodeScannerStory.storyName = "Barcode Scanner";
