import { TextField } from "@mui/material";
import { BatchSelectField } from "../../ui/components/BatchSelectField/BatchSelectField";
import { CardWithHeader } from "../../ui/components/CardWithHeader/CardWithHeader";
import { ScreenWrapper } from "../../ui/components/ScreenWrapper/ScreenWrapper";
import { Horizontal, Vertical } from "components";
import { AgeSelectField } from "./AgeSelectField";
import { GenderSelectField } from "./GenderSelectField";
import { ContainedButton } from "../../ui/components/buttons/ContainedButton/ContainedButton";
import { OutlinedButton } from "../../ui/components/buttons/OutlinedButton/OutlinedButton";
import { IEmailOrMobileCheckinAPIPayload } from "v1/model/interfaces/api/IEmailOrMobileCheckinAPIPayload";

export const EmailOrMobileCheckinScreen: React.FC<{
  initialBatch: string;
  isCheckinDisabled: boolean;
  isMobileCheckin: boolean;
  initialMobileNumber: string;
  initialEmailAddress: string;
  onClickCheckin: () => void;
  onClickCancel: () => void;
  onChange: (updatedValue: Partial<IEmailOrMobileCheckinAPIPayload>) => void;
}> = ({
  initialBatch,
  isCheckinDisabled,
  isMobileCheckin,
  initialEmailAddress,
  initialMobileNumber,
  onChange,
  onClickCancel,
  onClickCheckin,
}) => {
  const handleChangeTextField: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (evt) => {
    const { name, value } = evt.target;
    onChange({ [name]: value });
  };
  const handleChangeSelectField = (name: string, value: string) => {
    onChange({ [name]: value });
  };
  return (
    <ScreenWrapper>
      <CardWithHeader heading="Email Or Mobile Checkin">
        <Vertical gap={1}>
          <BatchSelectField
            defaultValue={initialBatch}
            onChange={handleChangeSelectField}
          />
          <TextField
            type="text"
            name="fullName"
            variant="standard"
            label={"Full Name"}
            fullWidth
            onChange={handleChangeTextField}
          />
          <Horizontal gap={3}>
            <AgeSelectField onChange={handleChangeSelectField} />
            <GenderSelectField onChange={handleChangeSelectField} />
          </Horizontal>
          <TextField
            type="text"
            name="city"
            variant="standard"
            label={"City"}
            fullWidth
            onChange={handleChangeTextField}
          />
          <TextField
            type="text"
            name="state"
            variant="standard"
            label={"State"}
            fullWidth
            onChange={handleChangeTextField}
          />
          <TextField
            type="text"
            name="country"
            variant="standard"
            label={"Country"}
            fullWidth
            onChange={handleChangeTextField}
          />
          <TextField
            type="tel"
            name="mobile"
            variant="standard"
            label={"Mobile"}
            disabled={!isMobileCheckin === true}
            fullWidth
            defaultValue={initialMobileNumber}
            onChange={handleChangeTextField}
          />
          <TextField
            type="email"
            name="email"
            variant="standard"
            label={"Email"}
            disabled={isMobileCheckin}
            defaultValue={initialEmailAddress}
            fullWidth
            onChange={handleChangeTextField}
          />
          <TextField
            type="text"
            name="dormAndBerthAllocation"
            variant="standard"
            label={"Dorm And Berth Allocation"}
            fullWidth
            onChange={handleChangeTextField}
          />
          <Horizontal justifyContent={"space-evenly"}>
            <OutlinedButton onClick={onClickCancel}>Cancel</OutlinedButton>
            <ContainedButton
              disabled={isCheckinDisabled}
              onClick={onClickCheckin}
            >
              Checkin
            </ContainedButton>
          </Horizontal>
        </Vertical>
      </CardWithHeader>
    </ScreenWrapper>
  );
};
