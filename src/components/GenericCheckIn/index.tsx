import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Avatar, Divider, ListItemText, ListSubheader } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
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

export type GenericCheckInProps = EventNameAndLocationProps & {};

export const GenericCheckIn: FC<GenericCheckInProps> = ({
  eventLocation,
  eventName,
}) => {
  const [userInfo, setUserInfo] = useState<string>("");
  const onClickBackButton = useCallback<
    AppBarProps["onClickBackButton"]
  >(() => {
    alert("lets go back");
  }, []);

  const onChangeUserInfo = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ currentTarget: { value } }) => {
      setUserInfo(value);
    },
    []
  );

  const onCheckInUser = useCallback<ClickHandler>(() => {}, []);

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
        control={
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
        }
      />
      <Button variant="contained" size="large" type="button">
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
        {map<string, JSX.Element>((name) => (
          <React.Fragment>
            <ListItem
              key={name}
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
        ))(["Prakash Mishra", "Gayathri Devaswami"])}
      </List>
    </Box>
  );
};
