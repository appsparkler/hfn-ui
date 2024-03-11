import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ChangeEvent, MutableRefObject, useCallback, useState } from "react";
import { BarcodeScanner, BarcodeScannerProps } from "./BarcodeScanner";
import { BrowserMultiFormatReader } from "@zxing/library";
import { Vertical } from "components";
import { Switch } from "@mui/material";

export default {
  title: "Widgets/GSM/features/Barcode Scanner",
  component: BarcodeScanner,
} as ComponentMeta<typeof BarcodeScanner>;

const Template: ComponentStory<typeof BarcodeScanner> = (args) => {
  const handleMount = useCallback<BarcodeScannerProps["onMount"]>(
    async (videoRef, codeReader) => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
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
      args.onMount(videoRef, codeReader);
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

export const BarcodeScannerSimple = () => {
  const [show, setShow] = useState(false);
  const handleMount: BarcodeScannerProps["onMount"] = async (
    videoRef,
    codeReader
  ) => {
    await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      codeReader.decodeFromVideoDevice(
        "",
        videoRef.current,
        (result, error) => {
          // await codeReader.tryPlayVideo()
          if (!error) {
            alert(result.getText());
          }
        }
      );
    }
  };

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void {
    setShow(checked)
  }

  return (
    <Vertical>
      <Switch onChange={handleChange} />
      {show && (
        <BarcodeScanner
          show={show}
          onMount={handleMount}
          onCancel={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
    </Vertical>
  );
};
