import React from "react";
import { SuccessScreen } from "./SuccessScreen";
import { useAppDispatch, useAppSelector } from "../redux-app/hooks";
import {
  selectSuccessScreen,
  successScreenActions,
} from "./successScreenSlice";

export const SuccessScreenWithVM: React.FC<{
  onClickGoToMainScreen: () => void;
}> = ({ onClickGoToMainScreen }) => {
  const dispatch = useAppDispatch();

  const state = useAppSelector(selectSuccessScreen);

  const handleClickGotoMainScreen = () => {
    dispatch(successScreenActions.reset());
    onClickGoToMainScreen();
  };

  return (
    <SuccessScreen
      manualEntryUser={state.manualEntryUser}
      qrUser={state.qrUser}
      onClickGoToMainScreen={handleClickGotoMainScreen}
    />
  );
};
