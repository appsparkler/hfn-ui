import { resolve } from "node:path/win32";
import { useCallback } from "react";
import {
  BhandaraCheckinWidget,
  BhandaraCheckinWidgetProps,
} from "./BhandaraCheckin";

// const verifyUser = (value: string) =>
//   new Promise(() => {
//     setTimeout(() => {
//       resolve("User can checkin");
//       resolve("User is already checked in");
//     }, 400);
//   });

export const BhandaraCheckinWidgetDemo = () => {
  // const handleClick = useCallback<
  //   BhandaraCheckinWidgetProps["onClickStartCheckin"]
  //   >(async() => {
  //     const successMessage = await verifyUser();

  //     return successMessage;
  // }), []);

  return <BhandaraCheckinWidget />;
};
