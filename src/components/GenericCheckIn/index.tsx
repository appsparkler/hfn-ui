import {
  Favorite as FavouriteIcon,
  FavoriteBorder,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import {
  Alert,
  AlertColor,
  Avatar,
  CircularProgress,
  Divider,
  ListItemText,
  ListSubheader,
  Snackbar,
  SnackbarProps,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import TextField from "@mui/material/TextField";
import React, {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useCallback,
  useMemo,
  useState,
} from "react";
import Button from "@mui/material/Button";
import {
  EventNameAndLocation,
  EventNameAndLocationProps,
} from "../EventNameAndLocation";
import { AppBar, AppBarProps } from "../SignedInUserCheckIn";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import map from "lodash/fp/map";
import { find, random, some } from "lodash/fp";

const label = "Sign In";

export type AsyncButtonProps = {
  onClick: ClickHandler;
  disabled?: boolean;
  errorMessage: string;
  successMessage: string;
};

export const AsyncButton = ({
  onClick = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (random(1)(2) === 1) resolve();
        else reject("API failed");
      }, 500);
    });
  },
  disabled,
  successMessage = "Done!",
  errorMessage = "Oops! Something went wrong!",
}: AsyncButtonProps) => {
  const [snackbar, setSnackbar] = useState<{
    isOpen: boolean;
    message: string;
    severity: AlertColor;
  }>({
    isOpen: false,
    message: "",
    severity: "error",
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const handleClick = useCallback<ClickHandler>(
    async (evt) => {
      setIsProcessing(true);
      try {
        await onClick(evt);
        setSnackbar({
          isOpen: true,
          message: successMessage,
          severity: "success",
        });
      } catch (e) {
        setSnackbar({
          isOpen: true,
          message: errorMessage,
          severity: "error",
        });
      } finally {
        setIsProcessing(false);
      }
    },
    [errorMessage, onClick, successMessage]
  );
  const handleSnackbarClose = useCallback<SnackbarProps["onClose"]>(() => {
    setSnackbar((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <Button
        variant="contained"
        type="button"
        onClick={handleClick}
        disabled={disabled || Boolean(isProcessing)}
      >
        {label}
      </Button>
      {isProcessing && (
        <CircularProgress
          sx={{
            position: "absolute",
            left: "calc(50% - 10px)",
            top: "calc(50% - 10px)",
          }}
          size={20}
        />
      )}
      <Snackbar
        open={snackbar.isOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export type ClickHandler = MouseEventHandler<HTMLButtonElement>;

export type InputChangeEventHandler = ChangeEventHandler<HTMLInputElement>;

export type IdType = { id: string };

export type IdNameType = IdType & {
  name: string;
};

export type MobileNumberOrEmailOrAbhyasiId =
  | { mobileNumber: string }
  | { email: string }
  | { abhyasiId: string };

export type Favourite = IdNameType & MobileNumberOrEmailOrAbhyasiId;

export type GenericCheckInProps = EventNameAndLocationProps & {
  favourites: Favourite[];
  onCheckInUser: (userInfo: string, addToFavorite: boolean) => void;
  onCheckInFavourite: (favouriteUserId: string) => void;
};

export const GenericCheckIn: FC<GenericCheckInProps> = ({
  eventLocation,
  eventName,
  favourites = [],
  onCheckInUser,
  onCheckInFavourite,
}) => {
  const [userInfo, setUserInfo] = useState<string>("");

  const [snackbar, setSnackbar] = useState<{
    isOpen: boolean;
    message: string;
    severity: AlertColor;
  }>({
    isOpen: false,
    message: "",
    severity: "error",
  });

  const [addToFavorite, setAddToFavorite] = useState<boolean>(false);

  const [checkedInFavourites, setCheckedInFavourites] = useState<string[]>([]);

  const isCheckInButtonDisabled = useMemo<boolean>(
    () => userInfo.trim().length === 0,
    [userInfo]
  );

  const { hasFavourites, noFavourites } = useMemo<{
    hasFavourites: boolean;
    noFavourites: boolean;
  }>(() => {
    const hasFavourites = favourites.length > 0;
    const noFavourites = !hasFavourites;
    return {
      hasFavourites,
      noFavourites,
    };
  }, [favourites]);

  const onClickBackButton = useCallback<
    AppBarProps["onClickBackButton"]
  >(() => {
    alert("lets go back");
  }, []);

  const onChangeUserInfo = useCallback<InputChangeEventHandler>(
    ({ currentTarget: { value } }) => {
      setUserInfo(value);
    },
    []
  );

  const handleChangeAddToFavourite = useCallback<
    FormControlLabelProps["onChange"]
  >(() => {
    setAddToFavorite((prevValue) => !prevValue);
  }, [setAddToFavorite]);

  const handleCheckInUser = useCallback<ClickHandler>(() => {
    onCheckInUser(userInfo, addToFavorite);
  }, [onCheckInUser, userInfo, addToFavorite]);

  const handleCheckInFavouriteUser = useCallback<ClickHandler>(
    async ({ currentTarget: { dataset } }) => {
      const { id } = dataset;
      const findWithId = (idToFind: string) =>
        find<Favourite>(({ id }) => id === idToFind);
      const { name } = findWithId(id)(favourites);
      try {
        await onCheckInFavourite(id);
        setCheckedInFavourites((prevItems) => [...prevItems, id]);
        setSnackbar({
          isOpen: true,
          message: `${name} is checked in`,
          severity: "success",
        });
      } catch (e) {
        setSnackbar({
          isOpen: true,
          message: `Couldn't check-in ${name}`,
          severity: "error",
        });
      }
    },
    [onCheckInFavourite, favourites]
  );

  const handleSnackbarClose = useCallback(() => {
    setSnackbar({ isOpen: false, message: "", severity: "error" });
  }, []);

  const isFavouriteCheckInDisabled = useCallback(
    (id) =>
      some<Favourite>((checkedInId) => checkedInId === id)(checkedInFavourites),
    [checkedInFavourites]
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        bg: "",
      }}
      gap={3}
    >
      <AppBar onClickBackButton={onClickBackButton} />
      <Box>
        <EventNameAndLocation
          eventLocation={eventLocation}
          eventName={eventName}
        />
      </Box>
      <Box width={[300, 400]} display="flex">
        <TextField
          required
          id="outlined-required"
          label="Abhyasi ID, Email or Mobile Number"
          value={userInfo}
          fullWidth
          onChange={onChangeUserInfo}
        />
      </Box>
      <FormControlLabel
        label="Add To Favorites"
        onChange={handleChangeAddToFavourite}
        checked={addToFavorite}
        control={
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<FavouriteIcon />} />
        }
      />
      <Button
        variant="contained"
        size="large"
        type="button"
        onClick={handleCheckInUser}
        disabled={isCheckInButtonDisabled}
      >
        Check In
      </Button>
      <List
        dense={false}
        sx={{ width: ["100%", 400], maxWidth: 400 }}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Checkin from your favourites list
          </ListSubheader>
        }
      >
        {hasFavourites &&
          map<Favourite, JSX.Element>(({ name, id }) => (
            <React.Fragment>
              <ListItem
                key={id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} />
                {!isFavouriteCheckInDisabled(id) && (
                  <Button
                    data-id={id}
                    variant="outlined"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={handleCheckInFavouriteUser}
                    disabled={isFavouriteCheckInDisabled(id)}
                  >
                    Check In
                  </Button>
                )}
                {isFavouriteCheckInDisabled(id) && (
                  <Box marginLeft={2}>
                    <CheckCircleIcon color="success" />
                  </Box>
                )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))(favourites)}
        {noFavourites && (
          <Typography color="InactiveCaptionText" variant="body2">
            <i>No farourites</i>
          </Typography>
        )}
      </List>
      <Snackbar
        open={snackbar.isOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
