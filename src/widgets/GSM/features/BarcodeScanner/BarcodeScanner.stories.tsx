import { ComponentMeta } from "@storybook/react";
import { ChangeEvent, useState } from "react";
import { BarcodeScanner } from "./BarcodeScanner";

import { Vertical } from "components";
import { Switch } from "@mui/material";

export default {
  title: "Widgets/GSM/features/Barcode Scanner",
  component: BarcodeScanner,
} as ComponentMeta<typeof BarcodeScanner>;

export const BarcodeScannerStory = () => {
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
          show={show}
          onScan={handleScan}
          onCancel={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
    </Vertical>
  );
};
BarcodeScannerStory.storyName = "Barcode Scanner";
