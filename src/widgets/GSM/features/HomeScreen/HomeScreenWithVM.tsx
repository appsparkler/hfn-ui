import React, { useEffect } from "react";
import { HomeScreen } from "./HomeScreen";
import { ManualEntryUser } from "widgets/GSM/model/ManualEntryUser";
import { useAppDispatch, useAppSelector } from "../redux-app/hooks";
import { homeScreenActions } from "./homeScreenSlice";

export const HomeScreenWithVM: React.FC<{}> = () => {
  const state = useAppSelector((state) => state.homeScreen);

  const dispatch = useAppDispatch();

  function handleChangeUserDetails(user: ManualEntryUser): void {
    dispatch(homeScreenActions.updateUserInfo(user));
  }

  const handleClickScannerSwitch: (checked: boolean) => void = (checked) => {
    dispatch(homeScreenActions.updateScannerSwitch(checked));
  };

  useEffect(() => {
    dispatch(homeScreenActions.resetUserInfo());
  }, [dispatch]);

  return (
    <HomeScreen
      user={state.user}
      checkinButtonDisabled={false}
      isScannerOn={state.isScannerOn}
      onClickScannerSwitch={handleClickScannerSwitch}
      onClickCheckin={function (): void {
        throw new Error("Function not implemented.");
      }}
      onClickScan={function (): void {
        throw new Error("Function not implemented.");
      }}
      onChangeUserDetails={handleChangeUserDetails}
    />
  );
};
