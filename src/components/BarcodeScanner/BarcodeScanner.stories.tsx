import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BarcodeScanner } from "./BarcodeScanner";

export default {
  title: "Components/Scanners/Barcode Scanner",
  component: BarcodeScanner,
} as ComponentMeta<typeof BarcodeScanner>;

const Template: ComponentStory<typeof BarcodeScanner> = (args) => (
  <BarcodeScanner {...args} />
);
export const barcodeScanner = Template.bind({});
barcodeScanner.args = {
  show: true,
};
