import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  FC,
  MouseEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { EventNameAndLocationProps } from "../EventNameAndLocation";
import { GenericCheckIn, GenericCheckInProps } from "../GenericCheckIn";
import { AsyncButton } from "../AsyncButton";
import { AppHeader } from "../Header";
import { FavouriteListProps } from "../FavouriteList";
import { GenericCheckInVerboseValue } from "../GenericCheckInVerbose";

export type SignedInUserCheckInMainScreenProps = {
  isCheckedIn: boolean;
  onClickCheckIn: ClickHandler;
  onClickHelpOthersCheckIn: ClickHandler;
};

export const SignedUserCheckInMainScreen = ({
  isCheckedIn,
  onClickCheckIn,
  onClickHelpOthersCheckIn,
}: SignedInUserCheckInMainScreenProps) => {
  const handleClickCheckIn = useCallback<ClickHandler>(
    async (...args) => {
      try {
        await onClickCheckIn(...args);
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
      {isCheckedIn ? (
        <Box display="flex" alignContent={"center"} gap="5px">
          <CheckCircleIcon color="success" sx={{ fontSize: 42 }} />
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
  isCheckedIn: boolean;
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

export const SignedInUserCheckIn: FC<SignedInUserCheckInProps> = ({
  favourites,
  eventLocation,
  eventName,
  unRegisteredUserInfo,
  isCheckedIn,
  onClickCheckIn,
  onCheckInFavourite,
  onDeleteFavourite,
  onCheckInUser,
  onChangeVerboseUserInfo,
  onCheckInVerboseUser,
}) => {
  const genericCheckinHandle: GenericCheckInProps["handle"] = useRef({
    setShowVerboseCheckin: undefined,
    showVerboseCheckin: undefined,
    setUserInfo: undefined,
  });

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
    if (genericCheckinHandle.current.showVerboseCheckin) {
      genericCheckinHandle.current.setUserInfo("");
      genericCheckinHandle.current.setShowVerboseCheckin(false);
    } else if (showGenericCheckInPage) {
      setCurrentPage(SignedInUserScreen.MAIN_PAGE);
    } else {
      alert("go back");
    }
  }, [showGenericCheckInPage]);

  return (
    <>
      <AppHeader
        onClickBackButton={handleClickBackButton}
        eventLocation={eventLocation}
        eventName={eventName}
      />
      <Box
        sx={{ display: "flex", gap: 5 }}
        flexDirection="column"
        pb={1}
        px={1}
      >
        {showMainPage && (
          <SignedUserCheckInMainScreen
            isCheckedIn={isCheckedIn}
            onClickCheckIn={onClickCheckIn}
            onClickHelpOthersCheckIn={handleClickHelpOthersCheckIn}
          />
        )}
        {showGenericCheckInPage && (
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
        )}
      </Box>
    </>
  );
};
