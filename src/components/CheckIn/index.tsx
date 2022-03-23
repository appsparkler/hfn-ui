import { FC, MouseEventHandler } from "react";
import {
  // SignedInUserCheckIn,
  SignedInUserCheckInProps,
} from "../SignedInUserCheckIn";
import { GuestUserCheckinProps } from "../GuestUserCheckIn";

export type ClickHandler = MouseEventHandler<HTMLButtonElement>;

export type CheckInProps = SignedInUserCheckInProps &
  GuestUserCheckinProps & {};

export const CheckIn: FC<CheckInProps> = ({ onClickCheckIn }) => (
  // <SignedInUserCheckIn onClickCheckIn={onClickCheckIn} />
  <div>Signed In User Checkin (WIP)</div>
);
