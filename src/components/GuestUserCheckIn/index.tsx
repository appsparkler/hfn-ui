import Box from "@mui/material/Box";
import { FC, MouseEventHandler, useCallback, useMemo, useState } from "react";
import MUIAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { EventNameAndLocationProps } from "../EventNameAndLocation";
import { GenericCheckIn, GenericCheckInProps } from "../GenericCheckIn";
import { AppHeader } from "../Header";

export type AppBarProps = {
  onClickBackButton: ClickHandler;
};

export const AppBar: FC<AppBarProps> = ({ onClickBackButton }) => (
  <MUIAppBar position="static">
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={onClickBackButton}
      >
        <ArrowBackIcon />
      </IconButton>
    </Toolbar>
  </MUIAppBar>
);

export type ClickHandler = MouseEventHandler<HTMLButtonElement>;

export type GuestUserCheckinProps = {
  onClickCheckIn: ClickHandler;
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
  unRegisteredUserInfo,
}) => {
  const [currentPage, setCurrentPage] = useState<SignedInUserScreen>(
    SignedInUserScreen.MAIN_PAGE
  );

  const { showMainPage, showGenericCheckInPage } = useMemo<{
    showMainPage: boolean;
    showGenericCheckInPage: boolean;
  }>(() => {
    const currentPageString = currentPage.toString();
    return {
      showMainPage:
        currentPageString === SignedInUserScreen.MAIN_PAGE.toString(),
      showGenericCheckInPage:
        currentPageString ===
        SignedInUserScreen.GENERIC_CHECKIN_PAGE.toString(),
    };
  }, [currentPage]);

  const handleClickBackButton = useCallback<ClickHandler>(() => {
    if (showMainPage) {
    } else if (showGenericCheckInPage) {
      setCurrentPage(SignedInUserScreen.MAIN_PAGE);
    }
  }, [showGenericCheckInPage, showMainPage]);

  return (
    <>
      <AppHeader
        onClickBackButton={handleClickBackButton}
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
