import { useAppDispatch, useAppSelector } from "v1/app/hooks";
import { MainScreen } from "./MainScreen";
import { mainScreenActions } from "./mainScreenSlice";
import { ILocationState } from "v1/model/interfaces/ILocationState";

export const MainScreenConnected: React.FC<{
  onClickCheckin: (locationState: ILocationState) => void;
  onClickScan: (batch: string) => void;
}> = ({ onClickCheckin, onClickScan }) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.mainScreen);

  const handleChangeBatch = (_: string, updatedBatch: string) => {
    dispatch(mainScreenActions.updateBatch(updatedBatch));
  };

  const handleChangeValue = (updatedValue: string) => {
    dispatch(mainScreenActions.updateValue(updatedValue));
  };

  const handleClickCheckin = () => {
    onClickCheckin({
      batch: state.selectedBatch,
      inputValue: state.value,
    });
  };

  const handleClickScan = () => {
    onClickScan(state.selectedBatch);
  };

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
