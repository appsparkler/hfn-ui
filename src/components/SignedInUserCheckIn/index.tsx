import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FC, MouseEventHandler, useCallback, useMemo, useState } from "react";
import MUIAppBar from "@mui/material/AppBar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  EventNameAndLocation,
  EventNameAndLocationProps,
} from "../EventNameAndLocation";
import { GenericCheckIn, GenericCheckInProps } from "../GenericCheckIn";
import { AsyncButton } from "../AsyncButton";

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

export type SignedInUserCheckInMainScreenProps = {
  onClickCheckIn: ClickHandler;
  onClickHelpOthersCheckIn: ClickHandler;
};

export const SignedUserCheckInMainScreen = ({
  onClickCheckIn,
  onClickHelpOthersCheckIn,
}: SignedInUserCheckInMainScreenProps) => {
  const [showCheckedInView, setShowCheckedInView] = useState<boolean>(false);

  const handleClickCheckIn = useCallback<ClickHandler>(
    async (...args) => {
      try {
        await onClickCheckIn(...args);
        setShowCheckedInView(true);
      } catch (e: any) {
        throw e;
      }
    },
    [onClickCheckIn]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
      }}
    >
      {showCheckedInView ? (
        <Box display="flex" alignContent={"center"} gap="5px">
          <CheckCircleIcon color="success" sx={{ fontSize: 42 }} />
          {/* <Typography variant="body1"> {checkInMessage}</Typography> */}
        </Box>
      ) : (
        <AsyncButton
          variant="contained"
          type="button"
          size="large"
          onClick={handleClickCheckIn}
          label="Check In"
        />
      )}
      <Button
        variant="outlined"
        type="button"
        size="large"
        onClick={onClickHelpOthersCheckIn}
      >
        Help Others Check In
      </Button>
    </Box>
  );
};

export type ClickHandler = MouseEventHandler<HTMLButtonElement>;

export type SignedInUserCheckInProps = {
  onClickCheckIn: ClickHandler;
} & GenericCheckInProps &
  EventNameAndLocationProps;

export enum SignedInUserScreen {
  MAIN_PAGE,
  GENERIC_CHECKIN_PAGE,
}

export const SignedInUserCheckIn: FC<SignedInUserCheckInProps> = ({
  favourites,
  eventLocation,
  eventName,
  onClickCheckIn,
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

  const handleClickHelpOthersCheckIn = useCallback(() => {
    setCurrentPage(SignedInUserScreen.GENERIC_CHECKIN_PAGE);
  }, []);

  const handleClickBackButton = useCallback<ClickHandler>(() => {
    if (showMainPage) {
    } else if (showGenericCheckInPage) {
      setCurrentPage(SignedInUserScreen.MAIN_PAGE);
    }
  }, [showGenericCheckInPage, showMainPage]);

  return (
    <>
      <AppBar onClickBackButton={handleClickBackButton} />
      <Box sx={{ display: "flex", gap: 5 }} flexDirection="column">
        <Box>
          <EventNameAndLocation
            eventName={eventName}
            eventLocation={eventLocation}
          />
        </Box>
        {showMainPage && (
          <SignedUserCheckInMainScreen
            onClickCheckIn={onClickCheckIn}
            onClickHelpOthersCheckIn={handleClickHelpOthersCheckIn}
          />
        )}
        {showGenericCheckInPage && (
          <GenericCheckIn
            favourites={favourites}
            onCheckInFavourite={onCheckInFavourite}
            onCheckInUser={onCheckInUser}
            onDeleteFavourite={onDeleteFavourite}
            onChangeVerboseUserInfo={onChangeVerboseUserInfo}
            onCheckInVerboseUser={onCheckInVerboseUser}
            unRegisteredUserInfo={unRegisteredUserInfo}
          />
        )}
      </Box>
    </>
  );
};
