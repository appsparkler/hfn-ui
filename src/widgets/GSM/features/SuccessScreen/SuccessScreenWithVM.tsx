import React from "react";
import { SuccessScreen } from "./SuccessScreen";
import { useAppSelector } from "../redux-app/hooks";
import { selectSuccessScreen } from "./successScreenSlice";

export const SuccessScreenWithVM: React.FC<{
  onClickGoToMainScreen: () => void;
}> = ({ onClickGoToMainScreen }) => {
  const state = useAppSelector(selectSuccessScreen);
  return (
    <SuccessScreen
      manualEntryUser={state.manualEntryUser}
      qrUser={state.qrUser}
      onClickGoToMainScreen={onClickGoToMainScreen}
    />
  );
};
