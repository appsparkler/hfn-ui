import React from "react";
import { HomeScreen } from "./HomeScreen";
import { ManualEntryUser } from "widgets/GSM/model/ManualEntryUser";
import { useAppDispatch, useAppSelector } from "../redux-app/hooks";

export const HomeScreenWithVM: React.FC<{}> = () => {
  const state = useAppSelector((state) => state.homeScreen);

  const dispatch = useAppDispatch();

  return (
    <HomeScreen
      user={state.user}
      checkinButtonDisabled={false}
      isScannerOn={false}
      onClickScannerSwitch={function (): void {
        throw new Error("Function not implemented.");
      }}
      onClickCheckin={function (): void {
        throw new Error("Function not implemented.");
      }}
      onClickScan={function (): void {
        throw new Error("Function not implemented.");
      }}
      onChangeUserDetails={function (user: ManualEntryUser): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};
