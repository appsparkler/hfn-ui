import { TextField } from "@mui/material";
import { CardWithHeader } from "../components/CardWithHeader/CardWithHeader";
import { Horizontal, Vertical } from "components";
import { OutlinedButton } from "../components/buttons/OutlinedButton/OutlinedButton";
import { ContainedButton } from "../components/buttons/ContainedButton/ContainedButton";
import { BatchSelectField } from "../components/BatchSelectField/BatchSelectField";
import { ScreenWrapper } from "../components/ScreenWrapper/ScreenWrapper";

export interface IAbhyasiIdCheckinScreenStateProps {
  abhyasiId: string;
  batchInitialValue: string;
}

export interface IAbhyasiIdCheckinScreenDispatchProps {
  onChangeBatch: (name: string, selectedBatch: string) => void;
  onChangeDormAndBerthAllocation: (dormAndBerthAllocation: string) => void;
  onClickCancel: () => void;
  onClickCheckin: () => void;
}

export const AbhyasiIdCheckinScreen: React.FC<
  IAbhyasiIdCheckinScreenStateProps & IAbhyasiIdCheckinScreenDispatchProps
> = ({
  abhyasiId,
  batchInitialValue,
  onChangeDormAndBerthAllocation,
  onChangeBatch,
  onClickCancel,
  onClickCheckin,
}) => {
  const handleChangeDormAndBerthAllocation: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (evt) => {
    onChangeDormAndBerthAllocation(evt.target.value);
  };
  return (
    <ScreenWrapper>
      <CardWithHeader heading={abhyasiId}>
        <Vertical gap={1}>
          <BatchSelectField
            defaultValue={batchInitialValue}
            onChange={onChangeBatch}
          />
          <TextField
            label={"Dorm & Berth Allocation"}
            variant="standard"
            defaultValue=""
            fullWidth
            onChange={handleChangeDormAndBerthAllocation}
          />
          <Horizontal alignItems={"center"} justifyContent={"space-evenly"}>
            <OutlinedButton onClick={onClickCancel}>cancel</OutlinedButton>
            <ContainedButton onClick={onClickCheckin}>Checkin</ContainedButton>
          </Horizontal>
        </Vertical>
      </CardWithHeader>
    </ScreenWrapper>
  );
};
