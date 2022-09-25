import { Dispatch } from "@reduxjs/toolkit";
import { BhandaraCheckinDispatchProps } from "widgets/BhandaraCheckin/types";

export const mapBhandaraCheckinDispatchToProps = (
  dispatch: Dispatch
): BhandaraCheckinDispatchProps => ({
  onMount: () => dispatch({ type: "BHANDARA_CHECKIN_MOUNT" }),
  onUnmount: () => dispatch({ type: "BHANDARA_CHECKIN_UNMOUNT" }),
});
