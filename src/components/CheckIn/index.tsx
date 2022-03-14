import { FC, MouseEventHandler } from "react";
import {
  SignedInUserCheckIn,
  SignedInUserCheckInProps,
} from "../SignedInUserCheckIn";

export type ClickHandler = MouseEventHandler<HTMLButtonElement>;

export type CheckInProps = SignedInUserCheckInProps & {};

export const CheckIn: FC<CheckInProps> = ({
  onClickCheckIn,
  onClickHelpOthersCheckIn,
}) => {
  return (
    <SignedInUserCheckIn
      onClickCheckIn={onClickCheckIn}
      onClickHelpOthersCheckIn={onClickHelpOthersCheckIn}
    />
  );
};
