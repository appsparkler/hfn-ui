import { useAppDispatch, useAppSelector } from "v1/app/hooks";
import {
  abhyasiIdCheckinScreenActions,
  selectAbhyasiIdCheckinScreen,
} from "./abhyasiIdCheckinSlice";
import { AbhyasiIdCheckinScreen } from "./AbhyasiIdCheckinScreen";
import { useEffect } from "react";

export const AbhyasiIdCheckinScreenConnected: React.FC<{
  abhyasiId: string;
  batchInitialValue: string;
}> = ({ abhyasiId, batchInitialValue }) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectAbhyasiIdCheckinScreen);

  const handleChangeBatch = (_: string, updatedBatch: string) => {
    dispatch(abhyasiIdCheckinScreenActions.updatedSelectedBatch(updatedBatch));
  };

  useEffect(() => {
    dispatch(abhyasiIdCheckinScreenActions.updatedSelectedBatch(abhyasiId));
  }, [abhyasiId, dispatch]);

  return (
    <AbhyasiIdCheckinScreen
      abhyasiId={abhyasiId}
      batchInitialValue={batchInitialValue}
      onChangeBatch={handleChangeBatch}
      onChangeDormAndBerthAllocation={function (
        dormAndBerthAllocation: string
      ): void {
        throw new Error("Function not implemented.");
      }}
      onClickCancel={function (): void {
        throw new Error("Function not implemented.");
      }}
      onClickCheckin={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};
