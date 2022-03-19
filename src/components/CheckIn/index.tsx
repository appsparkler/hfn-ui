import { FC, MouseEventHandler } from "react";
import {
  SignedInUserCheckIn,
  SignedInUserCheckInProps,
} from "../SignedInUserCheckIn";

export type ClickHandler = MouseEventHandler<HTMLButtonElement>;

export type CheckInProps = SignedInUserCheckInProps & {};

export const CheckIn: FC<CheckInProps> = ({ onClickCheckIn }) => (
  // <SignedInUserCheckIn onClickCheckIn={onClickCheckIn} />
  <div>Signed In User Checkin (WIP)</div>
);
