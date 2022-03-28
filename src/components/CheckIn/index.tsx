import { FC, MouseEventHandler } from "react";
import {
  SignedInUserCheckIn,
  // SignedInUserCheckIn,
  SignedInUserCheckInProps,
} from "../SignedInUserCheckIn";
import { GuestUserCheckin, GuestUserCheckinProps } from "../GuestUserCheckIn";

export type ClickHandler = MouseEventHandler<HTMLButtonElement>;

export type CheckInProps = SignedInUserCheckInProps &
  GuestUserCheckinProps & {
    isSignedIn: boolean;
  };

export const CheckIn: FC<CheckInProps> = ({ isSignedIn, ...restProps }) => (
  <>
    {isSignedIn ? (
      <SignedInUserCheckIn {...restProps} />
    ) : (
      <GuestUserCheckin {...restProps} />
    )}
  </>
);
