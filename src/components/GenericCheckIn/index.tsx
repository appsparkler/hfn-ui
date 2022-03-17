import FavouriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Alert, { AlertColor } from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
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
  useRef,
  useState,
} from "react";
import {
  EventNameAndLocation,
  EventNameAndLocationProps,
} from "../EventNameAndLocation";
import { AppBar, AppBarProps } from "../SignedInUserCheckIn";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import map from "lodash/fp/map";
import { some } from "lodash/fp";
import { AsyncButton } from "../AsyncButton";

export type ClickHandler = MouseEventHandler<HTMLButtonElement>;

export type InputChangeEventHandler = ChangeEventHandler<HTMLInputElement>;

export type MobileNumberOrEmailOrAbhyasiId =
  | { mobileNumber: string }
  | { email: string }
  | { abhyasiId: string };

export type Favourite = {
  id: string;
  name: string;
} & MobileNumberOrEmailOrAbhyasiId;

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
  const userInfoRef = useRef<HTMLInputElement>();

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

  const handleClickBackButton = useCallback<
    AppBarProps["onClickBackButton"]
  >(() => {
    alert("lets go back");
  }, []);

  const handleChangeUserInfo = useCallback<InputChangeEventHandler>(
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

  const handleCheckInUser = useCallback<ClickHandler>(async () => {
    try {
      const successMessage = await onCheckInUser(userInfo, addToFavorite);
      setUserInfo("");
      userInfoRef.current.focus();
      return successMessage;
    } catch (error) {
      throw error;
    }
  }, [onCheckInUser, userInfo, addToFavorite]);

  const handleCheckInFavouriteUser = useCallback<ClickHandler>(
    async ({ currentTarget: { dataset } }) => {
      try {
        const { id } = dataset;
        const successMessage = await onCheckInFavourite(id);
        setCheckedInFavourites((prevItems) => [...prevItems, id]);
        return successMessage;
      } catch (e) {
        throw e;
      }
    },
    [onCheckInFavourite]
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
      <AppBar onClickBackButton={handleClickBackButton} />
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
          onChange={handleChangeUserInfo}
          inputRef={userInfoRef}
        />
      </Box>
      <FormControlLabel
        label="Add To Favorites"
        onChange={handleChangeAddToFavourite}
        checked={addToFavorite}
        control={
          <Checkbox
            icon={<FavoriteBorderIcon />}
            checkedIcon={<FavouriteIcon />}
          />
        }
      />
      <AsyncButton
        variant="contained"
        size="large"
        onClick={handleCheckInUser}
        disabled={isCheckInButtonDisabled}
        errorMessage={`Checkin unsuccessful with ${userInfo}.`}
        successMessage={`CheckedIn with ${userInfo}.`}
        label="Check In"
      />
      {/* <Button
        variant="contained"
        size="large"
        type="button"
        onClick={handleCheckInUser}
        disabled={isCheckInButtonDisabled}
      >
        Check In
      </Button> */}
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
                  <AsyncButton
                    data-id={id}
                    variant="outlined"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={handleCheckInFavouriteUser}
                    label="Check In"
                    successMessage={`${name} is checked in.`}
                    errorMessage={`Checkin unsuccessful for ${name}`}
                  />
                  // <Button
                  //   data-id={id}
                  //   variant="outlined"
                  //   size="small"
                  //   sx={{ ml: 1 }}
                  //   onClick={handleCheckInFavouriteUser}
                  //   disabled={isFavouriteCheckInDisabled(id)}
                  // >
                  //   Check In
                  // </Button>
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