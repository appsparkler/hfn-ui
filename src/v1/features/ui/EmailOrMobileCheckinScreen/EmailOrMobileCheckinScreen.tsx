import { TextField } from "@mui/material";
import { BatchSelectField } from "../components/BatchSelectField/BatchSelectField";
import { CardWithHeader } from "../components/CardWithHeader/CardWithHeader";
import { ScreenWrapper } from "../components/ScreenWrapper/ScreenWrapper";
import { Vertical } from "components";
import { AgeSelectField } from "./AgeSelectField";

export const EmailOrMobileCheckinScreen = () => {
  return (
    <ScreenWrapper>
      <CardWithHeader heading="Email Or Mobile Checkin">
        <Vertical gap={1}>
          <BatchSelectField defaultValue="batch-1" onChange={() => {}} />
          <TextField
            type="text"
            variant="standard"
            label={"Full Name"}
            fullWidth
          />
          <AgeSelectField onChange={() => {}} />
          <TextField
            type="text"
            name="city"
            variant="standard"
            label={"City"}
            fullWidth
          />
          <TextField
            type="text"
            name="state"
            variant="standard"
            label={"State"}
            fullWidth
          />
          <TextField
            type="text"
            name="country"
            variant="standard"
            label={"Country"}
            fullWidth
          />
          <TextField
            type="tel"
            name="mobile"
            variant="standard"
            label={"Mobile"}
            fullWidth
          />
          <TextField
            type="email"
            name="email"
            variant="standard"
            label={"Email"}
            fullWidth
          />
          <TextField
            type="text"
            name="dormAndBerthAllocation"
            variant="standard"
            label={"Dorm And Berth Allocation"}
            fullWidth
          />
        </Vertical>
      </CardWithHeader>
    </ScreenWrapper>
  );
};
