import { useAppDispatch, useAppSelector } from "v1/app/hooks";
import { MainScreen } from "./MainScreen";
import { mainScreenActions } from "./mainScreenSlice";

export const MainScreenConnected = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.mainScreen);

  const handleChangeBatch = () => {};

  const handleChangeValue = (updatedValue: string) => {
    dispatch(mainScreenActions.setIsCheckinDisabled(updatedValue));
  };

  const handleClickScan = () => {};

  const handleClickCheckin = () => {};

  return (
    <MainScreen
      value={state.value}
      eventTitle={state.eventTitle}
      defaultBatchValue={state.defaultBatchValue}
      isCheckinDisabled={state.isCheckinDisabled}
      onChangeBatch={handleChangeBatch}
      onChangeValue={handleChangeValue}
      onClickScan={handleClickScan}
      onClickCheckin={handleClickCheckin}
    />
  );
};
