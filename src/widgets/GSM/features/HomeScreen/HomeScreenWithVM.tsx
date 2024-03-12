import React, { useEffect } from "react";
import { HomeScreen } from "./HomeScreen";
import { ManualEntryUser } from "widgets/GSM/model/ManualEntryUser";
import { useAppDispatch, useAppSelector } from "../redux-app/hooks";
import { homeScreenActions } from "./homeScreenSlice";
import { successScreenActions } from "../SuccessScreen/successScreenSlice";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";

export const HomeScreenWithVM: React.FC<{
  onCheckin: () => void;
}> = ({ onCheckin }) => {
  const state = useAppSelector((state) => state.homeScreen);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  function handleChangeUserDetails(user: ManualEntryUser): void {
    dispatch(homeScreenActions.updateUserInfo(user));
  }

  const handleClickCheckin = () => {
    dispatch(successScreenActions.setManualEntryUser(state.user));
    dispatch(homeScreenActions.resetUserInfo());

    onCheckin();
  };

  const handleClickScan = () => {
    navigate(AppRoutes.SCANNER_SCREEN);
  };

  useEffect(() => {
    // reset all user info to start afresh
    dispatch(homeScreenActions.resetUserInfo());
    dispatch(successScreenActions.reset());
  }, [dispatch]);

  return (
    <HomeScreen
      user={state.user}
      onClickCheckin={handleClickCheckin}
      onClickScan={handleClickScan}
      onChangeUserDetails={handleChangeUserDetails}
    />
  );
};
