import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useCallback } from "react";
import { BarcodeScanner, BarcodeScannerProps } from "./BarcodeScanner";

export default {
  title: "Components/Scanners/Barcode Scanner",
  component: BarcodeScanner,
} as ComponentMeta<typeof BarcodeScanner>;

const Template: ComponentStory<typeof BarcodeScanner> = (args) => {
  const handleMount = useCallback<BarcodeScannerProps["onMount"]>(
    (videoRef) => {
      args.onMount(videoRef);
      if (videoRef.current) {
        videoRef.current.autoplay = true;
        videoRef.current.controls = true;
        videoRef.current.innerHTML = `<source src = "https://www.w3schools.com/html/mov_bbb.mp4">`;
      }
    },
    [args]
  );

  return <BarcodeScanner {...args} onMount={handleMount} />;
};
export const barcodeScanner = Template.bind({});
barcodeScanner.args = {
  show: true,
};
