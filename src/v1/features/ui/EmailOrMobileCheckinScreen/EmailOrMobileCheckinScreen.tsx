import { TextField } from "@mui/material";
import { BatchSelectField } from "../components/BatchSelectField/BatchSelectField";
import { CardWithHeader } from "../components/CardWithHeader/CardWithHeader";
import { ScreenWrapper } from "../components/ScreenWrapper/ScreenWrapper";
import { Vertical } from "components";

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
        </Vertical>
      </CardWithHeader>
    </ScreenWrapper>
  );
};
