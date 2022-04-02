import FavouriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import React, {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { AsyncButton } from "../AsyncButton";
import {
  GenericCheckInVerbose,
  GenericCheckInVerboseProps,
  UserInfoTypeEnum,
} from "../GenericCheckInVerbose";
import {
  abhyasiIdRegex,
  abhyasiIdTempRegex,
  emailRegEx,
  mobileNumberRegex,
} from "../../constants";
import { FavouriteList, FavouriteListProps } from "../FavouriteList";

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
  handle: React.MutableRefObject<{
    setShowVerboseCheckin: any;
    showVerboseCheckin: any;
  }>;
  onCheckInUser: (userInfo: string, addToFavorite: boolean) => void;
  unRegisteredUserInfo: GenericCheckInVerboseProps["value"];
  onCheckInVerboseUser: GenericCheckInVerboseProps["onClickCheckIn"];
  onChangeVerboseUserInfo: GenericCheckInVerboseProps["onChange"];
};

export const GenericCheckIn: FC<GenericCheckInProps> = ({
  handle,
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
      return successMessage;
    } catch (error) {
      setShowVerboseCheckin(true);
      throw error;
    }
  }, [onCheckInUser, userInfo, addToFavorite]);

  const handleClickCancel = useCallback(() => {
    setShowVerboseCheckin(false);
  }, []);

  useImperativeHandle(
    handle,
    () => {
      return {
        setShowVerboseCheckin,
        showVerboseCheckin,
      };
    },
    [showVerboseCheckin]
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        bg: "",
      }}
      gap={2}
    >
      {!showVerboseCheckin && (
        <>
          <TextField
            required
            id="outlined-required"
            label="Abhyasi ID, Email or Mobile Number"
            value={userInfo}
            fullWidth
            onChange={handleChangeUserInfo}
            inputRef={userInfoRef}
          />
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
