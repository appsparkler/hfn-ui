import Box from "@mui/material/Box";
import { FC, MouseEventHandler, useCallback, useRef } from "react";
import { EventNameAndLocationProps } from "../EventNameAndLocation";
import { FavouriteListProps } from "../FavouriteList";
import { GenericCheckIn, GenericCheckInProps } from "../GenericCheckIn";
import { GenericCheckInVerboseValue } from "../GenericCheckInVerbose";
import { AppHeader } from "../Header";

export type ClickHandler = MouseEventHandler<HTMLButtonElement>;

export type GuestUserCheckinProps = {
  onClickCheckIn: ClickHandler;
  onClickBackButton: ClickHandler;
  favourites: FavouriteListProps["favourites"];
  unRegisteredUserInfo: GenericCheckInVerboseValue;
  onCheckInFavourite: FavouriteListProps["onCheckInFavourite"];
  onDeleteFavourite: FavouriteListProps["onDeleteFavourite"];
  onCheckInUser: GenericCheckInProps["onCheckInUser"];
  onChangeVerboseUserInfo: GenericCheckInProps["onChangeVerboseUserInfo"];
  onCheckInVerboseUser: GenericCheckInProps["onCheckInVerboseUser"];
} & EventNameAndLocationProps;

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
  const genericCheckinHandle: GenericCheckInProps["handle"] = useRef({
    setShowVerboseCheckin: undefined,
    showVerboseCheckin: undefined,
    setUserInfo: undefined,
  });
  const handleClickBackButton = useCallback<ClickHandler>(
    (...args) => {
      const { setUserInfo, showVerboseCheckin, setShowVerboseCheckin } =
        genericCheckinHandle.current;
      setUserInfo("");
      if (showVerboseCheckin) {
        setShowVerboseCheckin(false);
      } else {
        onClickBackButton(...args);
      }
    },
    [onClickBackButton]
  );

  return (
    <>
      <AppHeader
        onClickBackButton={handleClickBackButton}
        eventName={eventName}
        eventLocation={eventLocation}
      />
      <Box
        sx={{ display: "flex", gap: 5 }}
        flexDirection="column"
        px={1}
        pb={1}
      >
        <GenericCheckIn
          handle={genericCheckinHandle}
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
