import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import { Vertical } from "components";
import { isEmpty } from "lodash/fp";
import React from "react";
import { ManualEntryUser } from "widgets/GSM/model/ManualEntryUser";

export const SuccessScreen: React.FC<{
  manualEntryUser: ManualEntryUser | null;
}> = ({ manualEntryUser }) => {
  return (
    <>
      <img src="image.webp" width={"100%"} alt="minister" />
      <Vertical alignItems={"center"}>
        <CheckCircleIcon
          color="success"
          sx={{
            fontSize: 80,
          }}
        />
        <Typography variant="h5">
          Checked In
        </Typography>
        <Card
          sx={{
            width: "100%",
            maxWidth: "420px"
          }}>
          <Typography
            sx={{
              p: 1,
              bgcolor: theme => theme.palette.primary.main,
              color: "primary.contrastText",
            }}
            variant="h5"
          >
            Checkin Details
          </Typography>
          <CardContent>
            {manualEntryUser != null && (
              <ManualEntryUserContent user={manualEntryUser} />
            )}
          </CardContent>
        </Card>
      </Vertical>
    </>
  );
  };

const LabelledText: React.FC<{
  label: string;
  value: string
}> = ({ label, value }) => {
  if (isEmpty(value)) {
    return null
  }
    return (
      <Typography variant="body1">
        <strong>{label}: </strong>
        {value}
      </Typography>
    );
  }

const ManualEntryUserContent: React.FC<{
  user: ManualEntryUser;
}> = ({user}) => {
  return (
    <Vertical>
      <LabelledText label="Name" value={user.name} />
      <LabelledText label="Mobile No." value={user.mobileNo} />
      <LabelledText label="Email" value={user.email} />
      <LabelledText label="Organization" value={user.organization} />
    </Vertical>
  );
};
