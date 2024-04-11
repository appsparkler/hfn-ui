import { TextField } from "@mui/material";
import { BatchSelectField } from "../components/BatchSelectField/BatchSelectField";
import { CardWithHeader } from "../components/CardWithHeader/CardWithHeader";
import { ScreenWrapper } from "../components/ScreenWrapper/ScreenWrapper";
import { Horizontal, Vertical } from "components";
import { AgeSelectField } from "./AgeSelectField";
import { GenderSelectField } from "./GenderSelectField";

export const EmailOrMobileCheckinScreen: React.FC<{
  onChange: (name: string, value: string) => void;
}> = ({ onChange }) => {
  const handleChangeTextField: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (evt) => {
    const { name, value } = evt.target;
    onChange(name, value);
  };
  return (
    <ScreenWrapper>
      <CardWithHeader heading="Email Or Mobile Checkin">
        <Vertical gap={1}>
          <BatchSelectField defaultValue="batch-1" onChange={() => {}} />
          <TextField
            type="text"
            name="fullName"
            variant="standard"
            label={"Full Name"}
            fullWidth
            onChange={handleChangeTextField}
          />
          <Horizontal gap={3}>
            <AgeSelectField onChange={onChange} />
            <GenderSelectField onChange={onChange} />
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
            fullWidth
            onChange={handleChangeTextField}
          />
          <TextField
            type="email"
            name="email"
            variant="standard"
            label={"Email"}
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
        </Vertical>
      </CardWithHeader>
    </ScreenWrapper>
  );
};
