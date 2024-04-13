import { useAppDispatch, useAppSelector } from "v1/app/hooks";
import {
  abhyasiIdCheckinScreenActions,
  selectAbhyasiIdCheckinScreen,
} from "./abhyasiIdCheckinSlice";
import { AbhyasiIdCheckinScreen } from "./AbhyasiIdCheckinScreen";
import { useEffect } from "react";

const { updateDormAndBerthAllocation, updatedSelectedBatch } =
  abhyasiIdCheckinScreenActions;

export const AbhyasiIdCheckinScreenConnected: React.FC<{
  abhyasiId: string;
  batchInitialValue: string;
}> = ({ abhyasiId, batchInitialValue }) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectAbhyasiIdCheckinScreen);

  const handleChangeBatch = (_: string, updatedBatch: string) => {
    dispatch(updatedSelectedBatch(updatedBatch));
  };

  const handleChangeDormAndBerthAllocation = (
    dormAndBerthAllocation: string
  ) => {
    dispatch(updateDormAndBerthAllocation(dormAndBerthAllocation));
  };

  useEffect(() => {
    dispatch(updatedSelectedBatch(batchInitialValue));
  }, [abhyasiId, batchInitialValue, dispatch]);

  return (
    <AbhyasiIdCheckinScreen
      abhyasiId={abhyasiId}
      batchInitialValue={batchInitialValue}
      onChangeBatch={handleChangeBatch}
      onChangeDormAndBerthAllocation={handleChangeDormAndBerthAllocation}
      onClickCancel={function (): void {
        throw new Error("Function not implemented.");
      }}
      onClickCheckin={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};
