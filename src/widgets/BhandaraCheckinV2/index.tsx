import { Card, CardContent, TextField, Typography } from "@mui/material";
import { Vertical } from "components";

export const BhandaraCheckinApp: React.FC<{}> = () => {
  return (
    <Vertical padding={2}>
      <Card
        sx={{
          color: "primary.contrastText",
          bgcolor: "primary.main",
        }}
      >
        <CardContent>
          <Typography variant="h5">
            Birth Anniversary of Pujya Babuji Maharaj
          </Typography>
          <TextField
            label="Checkin with..."
            variant="standard"
            defaultValue={"+91"}
          />
        </CardContent>
      </Card>
    </Vertical>
  );
};
