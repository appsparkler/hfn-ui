import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { useCallback } from "react";
import { BarcodeScanner, BarcodeScannerProps } from "./BarcodeScanner";

export default {
  title: "Components/Scanners/Barcode Scanner",
  component: BarcodeScanner,
} as ComponentMeta<typeof BarcodeScanner>;

const Template: ComponentStory<typeof BarcodeScanner> = (args) => {
  const handleMount = useCallback<BarcodeScannerProps["onMount"]>(
    async (videoRef) => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          const codeReader = new BrowserMultiFormatReader();
          const intervalId = setInterval(() => {
            if (videoRef.current) {
              const isVideoPlaying = codeReader.isVideoPlaying(
                videoRef.current
              );
              if (isVideoPlaying) {
                clearInterval(intervalId);
                alert("video has started playing");
              }
            }
          }, 300);
          codeReader.decodeFromVideoDevice(
            "",
            videoRef.current,
            (result, error) => {
              if (!error) {
                alert(result.getText());
              }
            }
          );
          return codeReader;
        }
      } catch (e) {
        alert("lets turn off the scanner as user has not given permission");
      }
      args.onMount(videoRef);
      return null;
    },
    [args]
  );

  return <BarcodeScanner {...args} onMount={handleMount} />;
};
export const barcodeScanner = Template.bind({});
barcodeScanner.args = {
  show: true,
};
