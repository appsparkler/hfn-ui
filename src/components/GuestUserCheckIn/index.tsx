import Box from "@mui/material/Box";
import { FC, MouseEventHandler } from "react";
import { EventNameAndLocationProps } from "../EventNameAndLocation";
import { GenericCheckIn, GenericCheckInProps } from "../GenericCheckIn";
import { AppHeader } from "../Header";

export type ClickHandler = MouseEventHandler<HTMLButtonElement>;

export type GuestUserCheckinProps = {
  onClickCheckIn: ClickHandler;
  onClickBackButton: ClickHandler;
} & GenericCheckInProps &
  EventNameAndLocationProps;

export enum SignedInUserScreen {
  MAIN_PAGE,
  GENERIC_CHECKIN_PAGE,
}

export const GuestUserCheckin: FC<GuestUserCheckinProps> = ({
  favourites,
  eventLocation,
  eventName,
  onCheckInFavourite,
  onDeleteFavourite,
  onCheckInUser,
  onChangeVerboseUserInfo,
  onCheckInVerboseUser,
  onClickBackButton,
  unRegisteredUserInfo,
}) => {
  return (
    <>
      <AppHeader
        onClickBackButton={onClickBackButton}
        eventName={eventName}
        eventLocation={eventLocation}
      />
      <Box sx={{ display: "flex", gap: 5 }} flexDirection="column">
        <GenericCheckIn
          favourites={favourites}
          onCheckInFavourite={onCheckInFavourite}
          onCheckInUser={onCheckInUser}
          onDeleteFavourite={onDeleteFavourite}
          onChangeVerboseUserInfo={onChangeVerboseUserInfo}
          onCheckInVerboseUser={onCheckInVerboseUser}
          unRegisteredUserInfo={unRegisteredUserInfo}
        />
      </Box>
    </>
  );
};
