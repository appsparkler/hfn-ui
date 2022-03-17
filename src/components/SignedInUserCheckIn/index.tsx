import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FC, MouseEventHandler, useCallback, useMemo, useState } from "react";
import MUIAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { EventNameAndLocation } from "../EventNameAndLocation";
import { Paper, Slide } from "@mui/material";
import { GenericCheckIn } from "../GenericCheckIn";

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
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Button variant="contained" type="button" onClick={onClickCheckIn}>
        Check In
      </Button>
      <Button
        variant="outlined"
        type="button"
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
  onClickHelpOthersCheckIn: ClickHandler;
};

export enum SignedInUserScreen {
  MAIN_PAGE,
  GENERIC_CHECKIN_PAGE,
}

export const SignedInUserCheckIn: FC<SignedInUserCheckInProps> = ({
  onClickCheckIn,
  onClickHelpOthersCheckIn,
}) => {
  const [currentPage, setCurrentPage] = useState<SignedInUserScreen>(
    SignedInUserScreen.MAIN_PAGE
  );
  const onClickBackButton = useCallback<ClickHandler>(() => {
    alert("lets go back");
  }, []);

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

  return (
    <>
      <AppBar onClickBackButton={onClickBackButton} />
      <Box>
        <EventNameAndLocation
          eventName="Youth Seminar"
          eventLocation="Kanha Shanti Vanam"
        />
      </Box>
      {showMainPage && (
        <Slide in={showMainPage} direction="left">
          <Box sx={{ padding: 5 }}>
            <SignedUserCheckInMainScreen
              onClickCheckIn={onClickCheckIn}
              onClickHelpOthersCheckIn={handleClickHelpOthersCheckIn}
            />
          </Box>
        </Slide>
      )}
      {showGenericCheckInPage && (
        <Slide in={showGenericCheckInPage} direction="left">
          <Box sx={{ padding: 5 }}>
            <GenericCheckIn
              eventLocation="Kanha Shanti Vanam"
              eventName="Youth Seminar"
              favourites={[]}
              onCheckInFavourite={console.log}
              onCheckInUser={console.log}
              onDeleteFavourite={console.log}
            />
          </Box>
        </Slide>
      )}
    </>
  );
};
