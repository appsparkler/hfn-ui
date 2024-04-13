import { TextField } from "@mui/material";
import { CardWithHeader } from "../../ui/components/CardWithHeader/CardWithHeader";
import { Horizontal, Vertical } from "components";
import { OutlinedButton } from "../../ui/components/buttons/OutlinedButton/OutlinedButton";
import { ContainedButton } from "../../ui/components/buttons/ContainedButton/ContainedButton";
import { BatchSelectField } from "../../ui/components/BatchSelectField/BatchSelectField";
import { ScreenWrapper } from "../../ui/components/ScreenWrapper/ScreenWrapper";

export const AbhyasiIdCheckinScreen: React.FC<{
  abhyasiId: string;
  batchInitialValue: string;
  onChangeBatch: (selectedBatch: string) => void;
  onChangeDormAndBerthAllocation: (dormAndBerthAllocation: string) => void;
  onClickCancel: () => void;
  onClickCheckin: () => void;
}> = ({
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
