import { Button, TextField } from "@mui/material";
import { CardWithHeader } from "../components/CardWithHeader/CardWithHeader";
import { Horizontal, Vertical } from "components";

export const AbhyasiIdCheckinScreen = () => {
  return (
    <CardWithHeader heading="ABCDEF888">
      <Vertical gap={1}>
        <TextField
          label={"Dorm & Berth Allocation"}
          variant="standard"
          defaultValue=""
          fullWidth
        />
        <Horizontal alignItems={"center"} justifyContent={"space-evenly"}>
          <Button
            type="button"
            size="large"
            disableElevation
            variant="outlined"
          >
            cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            type="button"
            disableElevation
          >
            Checkin
          </Button>
        </Horizontal>
      </Vertical>
    </CardWithHeader>
  );
};
