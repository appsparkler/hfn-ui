import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  ListItemText,
  ListSubheader,
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

export type ClickHandler = MouseEventHandler<HTMLButtonElement>;

export type InputChangeEventHandler = ChangeEventHandler<HTMLInputElement>;

export type IdType = { id: string };

export type IdNameType = IdType & {
  name: string;
};

export type Favourite =
  | (IdNameType & {
      mobileNumber: string;
    })
  | (IdNameType & { email: string })
  | (IdNameType & { abhyasiId: string });

export type GenericCheckInProps = EventNameAndLocationProps & {
  favourites: Favourite[];
  onCheckInUser: (userInfo: string, addToFavorite: boolean) => void;
};

export const GenericCheckIn: FC<GenericCheckInProps> = ({
  eventLocation,
  eventName,
  favourites = [],
  onCheckInUser,
}) => {
  const [userInfo, setUserInfo] = useState<string>("");

  const [addToFavorite, setAddToFavorite] = useState<boolean>(false);

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
  >(
    (evt) => {
      setAddToFavorite((prevValue) => !prevValue);
    },
    [setAddToFavorite]
  );

  const handleCheckInUser = useCallback<ClickHandler>(() => {
    onCheckInUser(userInfo, addToFavorite);
  }, [onCheckInUser, userInfo, addToFavorite]);

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
      <Box width={300}>
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
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
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
                <Button variant="outlined" size="small" sx={{ ml: 1 }}>
                  Check In
                </Button>
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
    </Box>
  );
};
