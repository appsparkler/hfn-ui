import FavouriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
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
import PersonIcon from "@mui/icons-material/Person";
import map from "lodash/fp/map";
import { AsyncButton } from "../AsyncButton";
import { someStringsMatch } from "../../utils";
import { AsyncIconButton } from "../AsyncIconButton";
import {
  GenericCheckInVerbose,
  GenericCheckInVerboseProps,
  UserInfoTypeEnum,
} from "../GenericCheckInVerbose";

export type FavouriteListProps = {
  favourites: Favourite[];
  onCheckInFavourite: (favouriteUserId: string) => void;
  onDeleteFavourite: (favouriteUserId: string) => void;
};

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
      sx={{ width: ["100%", 400], maxWidth: 400 }}
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

export type GenericCheckInProps = FavouriteListProps & {
  onCheckInUser: (userInfo: string, addToFavorite: boolean) => void;
  unRegisteredUserInfo: GenericCheckInVerboseProps["value"];
  onCheckInVerboseUser: GenericCheckInVerboseProps["onClickCheckIn"];
  onChangeVerboseUserInfo: GenericCheckInVerboseProps["onChange"];
};

export const GenericCheckIn: FC<GenericCheckInProps> = ({
  onCheckInUser,

  // Favorites List
  favourites,
  onCheckInFavourite,
  onDeleteFavourite,
  // Verbose Check In
  unRegisteredUserInfo,
  onCheckInVerboseUser,
  onChangeVerboseUserInfo,
}) => {
  const userInfoRef = useRef<HTMLInputElement>();

  const [showVerboseCheckin, setShowVerboseCheckin] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState<string>("");

  const [addToFavorite, setAddToFavorite] = useState<boolean>(false);

  const { isCheckInButtonDisabled, userInfoType } = useMemo<{
    isCheckInButtonDisabled: boolean;
    userInfoType: UserInfoTypeEnum | undefined;
  }>(() => {
    const trimmedUserInfo = String(userInfo.trim());
    const emailRegEx = new RegExp(
      /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$/
    );
    const abhyasiIdRegex = "^([a-zA-Z]{6}[0-9]{3}|[HABhab]{1}[0-9]{8})$";
    const abhyasiIdTempRegex = "^([HAha]{1}[0-9]{8})$";
    const mobileNumberRegex = /^(\+|00)[1-9][0-9 \-().]{7,32}$/;
    const isEmail = Boolean(userInfo.match(emailRegEx));
    const isAbhyasiIdRegex = Boolean(trimmedUserInfo.match(abhyasiIdRegex));
    const isAbhyasiIdTempRegex = Boolean(
      trimmedUserInfo.match(abhyasiIdTempRegex)
    );
    const isMobileNumber = Boolean(trimmedUserInfo.match(mobileNumberRegex));
    if (isEmail)
      return {
        isCheckInButtonDisabled: false,
        userInfoType: UserInfoTypeEnum.EMAIL,
      };
    if (isAbhyasiIdRegex) {
      return {
        isCheckInButtonDisabled: false,
        userInfoType: UserInfoTypeEnum.ABHYASI_ID,
      };
    }
    if (isAbhyasiIdTempRegex) {
      return {
        isCheckInButtonDisabled: false,
        userInfoType: UserInfoTypeEnum.ABHYASI_ID,
      };
    }
    if (isMobileNumber) {
      return {
        isCheckInButtonDisabled: false,
        userInfoType: UserInfoTypeEnum.MOBILE_NUMBER,
      };
    }
    return {
      isCheckInButtonDisabled: true,
      userInfoType: undefined,
    };
  }, [userInfo]);

  const handleChangeUserInfo = useCallback<InputChangeEventHandler>(
    ({ currentTarget: { value } }) => {
      setUserInfo(value);
    },
    []
  );

  const handleChangeAddToFavourite = useCallback<
    NonNullable<FormControlLabelProps["onChange"]>
  >(() => {
    setAddToFavorite((prevValue) => !prevValue);
  }, [setAddToFavorite]);

  const handleCheckInUser = useCallback<ClickHandler>(async () => {
    try {
      const successMessage = await onCheckInUser(userInfo, addToFavorite);
      setUserInfo("");
      userInfoRef.current?.focus();
      return successMessage;
    } catch (error) {
      setShowVerboseCheckin(true);
      throw error;
    }
  }, [onCheckInUser, userInfo, addToFavorite]);

  const handleClickCancel = useCallback(() => {
    setShowVerboseCheckin(false);
  }, []);

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
      {!showVerboseCheckin && (
        <>
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
            label="Check In"
          />
        </>
      )}
      {showVerboseCheckin && userInfoType && (
        <GenericCheckInVerbose
          value={unRegisteredUserInfo}
          onChange={onChangeVerboseUserInfo}
          onClickCheckIn={onCheckInVerboseUser}
          onClickCancel={handleClickCancel}
          type={userInfoType}
          notFoundDetails={userInfo}
        />
      )}
      <FavouriteList
        favourites={favourites}
        onCheckInFavourite={onCheckInFavourite}
        onDeleteFavourite={onDeleteFavourite}
      />
    </Box>
  );
};
