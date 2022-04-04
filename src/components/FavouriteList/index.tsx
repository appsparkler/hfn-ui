import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useMemo,
  useState,
} from "react";
import PersonIcon from "@mui/icons-material/Person";
import map from "lodash/fp/map";
import { AsyncButton } from "../AsyncButton";
import { someStringsMatch } from "../../utils";
import { AsyncIconButton } from "../AsyncIconButton";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { favouritesActions } from "../../store/reducers";

export type FavouriteListProps = {
  favourites: Favourite[];
  onCheckInFavourite: (favouriteUserId: string) => void;
  onDeleteFavourite: (favouriteUserId: string) => void;
};

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

export const FavouriteList = ({
  favourites = [],
  onCheckInFavourite,
  onDeleteFavourite,
}: FavouriteListProps) => {
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

  const handleClickDeleteFavourite = useCallback<ClickHandler>(
    async (evt) => {
      const {
        currentTarget: { dataset },
      } = evt;
      try {
        const { id = "" } = dataset;
        const successMessage = await onDeleteFavourite(id);

        return successMessage;
      } catch (error) {
        throw error;
      }
    },
    [onDeleteFavourite]
  );

  const handleCheckInFavouriteUser = useCallback<ClickHandler>(
    async ({ currentTarget: { dataset } }) => {
      const { id = "" } = dataset;
      const successMessage = await onCheckInFavourite(id);
      setCheckedInFavourites((prevItems) => [...prevItems, id]);
      return successMessage;
    },
    [onCheckInFavourite]
  );

  const [checkedInFavourites, setCheckedInFavourites] = useState<string[]>([]);

  const isFavouriteCheckInDisabled = useCallback(
    (id) => someStringsMatch(id)(checkedInFavourites),
    [checkedInFavourites]
  );

  return (
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
          <React.Fragment key={id}>
            <ListItem>
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
                />
              )}
              {isFavouriteCheckInDisabled(id) && (
                <Box marginLeft={2}>
                  <CheckCircleIcon color="success" />
                </Box>
              )}
              <AsyncIconButton
                data-id={id}
                edge="end"
                aria-label="delete"
                onClick={handleClickDeleteFavourite}
                size="medium"
              />
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
  );
};

type FavouriteListStateProps = {
  favourites: Favourite[];
  checkedIn: string[];
};

export type FavouriteListV2Props = FavouriteListStateProps &
  FavouriteListActionProps;

export type FavouriteListActionProps = {
  onCheckInFavourite: (id: string) => Promise<string>;
  onDeleteFavourite: (id: string) => Promise<string>;
};

export const FavouritesListV2 = ({
  favourites = [],
  checkedIn = [],
  onCheckInFavourite,
  onDeleteFavourite,
}: FavouriteListV2Props) => {
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

  const isFavouriteCheckInDisabled = useCallback(
    (id) => someStringsMatch(id)(checkedIn),
    [checkedIn]
  );

  const handleCheckinFavourite = useCallback<(id: string) => ClickHandler>(
    (id) => () => onCheckInFavourite(id),
    [onCheckInFavourite]
  );

  const handleDeleteFavourite = useCallback<(id: string) => ClickHandler>(
    (id) => () => onDeleteFavourite(id),
    [onDeleteFavourite]
  );

  return (
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
          <React.Fragment key={id}>
            <ListItem>
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
                  onClick={handleCheckinFavourite(id)}
                  label="Check In"
                />
              )}
              {isFavouriteCheckInDisabled(id) && (
                <Box marginLeft={2}>
                  <CheckCircleIcon color="success" />
                </Box>
              )}
              <AsyncIconButton
                data-id={id}
                edge="end"
                aria-label="delete"
                onClick={handleDeleteFavourite(id)}
                size="medium"
              />
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
  );
};

export type ConnectedFavouritesProps = FavouriteListActionProps;

export const ConnectedFavourites = connect<
  FavouriteListStateProps,
  FavouriteListActionProps,
  FavouriteListActionProps,
  RootState
>(
  ({ favourites: { all, checkedIn } }) => {
    return {
      favourites: all,
      checkedIn,
    };
  },
  (dispatch, { onDeleteFavourite, onCheckInFavourite }) => ({
    onCheckInFavourite: async (id: string) => {
      const successMessage = await onCheckInFavourite(id);
      dispatch(favouritesActions.checkIn(id));
      return successMessage;
    },
    onDeleteFavourite: async (id) => {
      const successMessage = await onDeleteFavourite(id);
      dispatch(favouritesActions.delete(id));
      return successMessage;
    },
  })
)(FavouritesListV2);
