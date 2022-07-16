import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BarcodeScanner } from "./BarcodeScanner";

export default {
  title: "Components/Scanners/Barcode Scanner - V0",
  component: BarcodeScanner,
} as ComponentMeta<typeof BarcodeScanner>;

const Template: ComponentStory<typeof BarcodeScanner> = (args) => (
  <BarcodeScanner {...args} />
);
export const barcodeScannerV0 = Template.bind({});
barcodeScannerV0.args = {
  show: true,
};
