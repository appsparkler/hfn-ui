import { useAppDispatch, useAppSelector } from "v1/app/hooks";
import {
  abhyasiIdCheckinScreenActions,
  selectAbhyasiIdCheckinScreen,
} from "./abhyasiIdCheckinSlice";
import { AbhyasiIdCheckinScreen } from "./AbhyasiIdCheckinScreen";
import { useEffect } from "react";
import { event } from "v1/model/data/event";
import { CheckinTypeEnum } from "v1/model/interfaces/CheckinTypeEnum";
import { toUpper } from "lodash/fp";
import { checkinWithAbhyasiId } from "v1/model/apiService/checkinWithAbhyasiId";

const { updateDormAndBerthAllocation, updatedSelectedBatch } =
  abhyasiIdCheckinScreenActions;

export const AbhyasiIdCheckinScreenConnected: React.FC<{
  abhyasiId: string;
  batchInitialValue: string;
  onClickCancel: () => void;
  onCheckin: () => void;
}> = ({ abhyasiId, batchInitialValue, onClickCancel, onCheckin }) => {
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

  const handleClickCheckin = async () => {
    checkinWithAbhyasiId({
      abhyasiId: toUpper(abhyasiId),
      batch: state.selectedBatch,
      dormAndBerthAllocation: state.dormAndBerthAllocation,
      eventName: event.title,
      timestamp: Date.now(),
      type: CheckinTypeEnum.ABHYASI_ID,
    });
    onCheckin();
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
      onClickCancel={onClickCancel}
      onClickCheckin={handleClickCheckin}
    />
  );
};
