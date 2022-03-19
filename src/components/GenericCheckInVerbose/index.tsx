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
import { Button, FormControl, FormHelperText } from "@mui/material";

export type InputWithPopoverProps = {
  helperText?: string;
};

const InputWithPopover = ({ helperText }: InputWithPopoverProps) => {
  return (
    <Box>
      <FormControl sx={{ width: "100%" }}>
        <TextField
          required
          size="medium"
          id="outlined-required"
          label="Abhyasi ID, Email or Mobile Number"
          fullWidth
          error
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
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

export type GenericCheckInVerboseProps = {
  favourites: Favourite[];
  onCheckInUser: (userInfo: string, addToFavorite: boolean) => void;
  onCheckInFavourite: (favouriteUserId: string) => void;
  onDeleteFavourite: (favouriteUserId: string) => void;
};

export const GenericCheckInVerbose: FC<GenericCheckInVerboseProps> = ({
  favourites = [],
  onCheckInUser,
  onCheckInFavourite,
  onDeleteFavourite,
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
    (id) => someStringsMatch(id)(checkedInFavourites),
    [checkedInFavourites]
  );

  const handleClickDeleteButton = useCallback<ClickHandler>(
    async (evt) => {
      const {
        currentTarget: { dataset },
      } = evt;
      try {
        const { id } = dataset;
        const successMessage = await onDeleteFavourite(id);

        return successMessage;
      } catch (error) {
        throw error;
      }
    },
    [onDeleteFavourite]
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
      <Box width={[300, 400]} display="flex" flexDirection={"column"} gap={5}>
        <FormControl sx={{ width: "100%" }}>
          <TextField
            required
            error
            size="medium"
            id="outlined-required"
            label="Abhyasi ID, Email or Mobile Number"
            value={userInfo}
            fullWidth
            onChange={handleChangeUserInfo}
            inputRef={userInfoRef}
          />
          <FormHelperText error>Mobile # is invalid</FormHelperText>
        </FormControl>
      </Box>
      <Box display="flex" gap={2}>
        <Button
          variant="outlined"
          size="large"
          onClick={handleCheckInUser}
          disabled={isCheckInButtonDisabled}
        >
          Cancel
        </Button>
        <AsyncButton
          variant="contained"
          size="large"
          onClick={handleCheckInUser}
          errorMessage={`Checkin unsuccessful with ${userInfo}.`}
          successMessage={`CheckedIn with ${userInfo}.`}
          label="Check In"
        />
      </Box>
    </Box>
  );
};
