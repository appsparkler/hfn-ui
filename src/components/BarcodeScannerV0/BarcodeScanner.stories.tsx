import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BarcodeScannerV0 } from "./BarcodeScanner";

export default {
  title: "Components/Scanners/Barcode Scanner - V0",
  component: BarcodeScannerV0,
} as ComponentMeta<typeof BarcodeScannerV0>;

const Template: ComponentStory<typeof BarcodeScannerV0> = (args) => (
  <BarcodeScannerV0 {...args} />
);
export const barcodeScannerV0 = Template.bind({});
barcodeScannerV0.args = {
  show: true,
};
