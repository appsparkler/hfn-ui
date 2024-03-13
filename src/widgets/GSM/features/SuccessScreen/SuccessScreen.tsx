import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import { Vertical } from "components";
import { isEmpty } from "lodash/fp";
import React from "react";
import { ManualEntryUser } from "widgets/GSM/model/ManualEntryUser";
import { IQRUser } from "widgets/GSM/model/QRUser";

export interface ISuccessScreenProps {
  manualEntryUser: ManualEntryUser | null;
  qrUser: IQRUser | null;
}

export interface ISuccessScreenActions {
  onClickGoToMainScreen: () => void;
}

export const SuccessScreen: React.FC<
  ISuccessScreenProps & ISuccessScreenActions
> = ({ manualEntryUser, qrUser, onClickGoToMainScreen }) => {
  return (
    <Vertical
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        width: "auto",
        maxWidth: "420px",
        mx: "auto",
        p: 2,
      }}
      gap={2}
    >
      <img src="image.webp" width={"100%"} alt="minister" />
      <Vertical justifyContent={"center"} alignItems={"center"}>
        <CheckCircleIcon
          color="success"
          sx={{
            fontSize: 80,
          }}
        />
        <Typography variant="h5">Checked In</Typography>
      </Vertical>
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: "420px",
          mx: 1,
        }}
      >
        <Typography
          sx={{
            p: 1,
            bgcolor: (theme) => theme.palette.primary.main,
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
          {qrUser != null && <QRUserContent user={qrUser} />}
        </CardContent>
      </Card>
      <ScreenshotInstruction />
      <Button type="button" onClick={onClickGoToMainScreen} variant="contained">
        RETURN TO MAIN SCREEN
      </Button>
    </Vertical>
  );
};

const ScreenshotInstruction: React.FC<{}> = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        color: (theme) => theme.palette.error.contrastText,
        bgcolor: "error.light",
        borderColor: "error.dark",
      }}
    >
      <CardContent>
        <Typography variant="body1">
          Please take a screenshot of this screen and show it at the
          registration desk along with a valid ID to collect your wrist band.
        </Typography>
      </CardContent>
    </Card>
  );
};

const LabelledText: React.FC<{
  label: string;
  value: string;
}> = ({ label, value }) => {
  if (isEmpty(value)) {
    return null;
  }
  return (
    <Typography variant="body1">
      <strong>{label}: </strong>
      {value}
    </Typography>
  );
};

const QRUserContent: React.FC<{
  user: IQRUser;
}> = ({ user }) => {
  return (
    <Vertical>
      <LabelledText label="Name" value={user.name} />
      <LabelledText label="Event Name" value={user.eventName} />
      <LabelledText label="Session Name" value={user.sessionName} />
      <LabelledText label="PNR" value={user.pnr} />
      <LabelledText label="Registration ID" value={user.registrationId} />
    </Vertical>
  );
};

const ManualEntryUserContent: React.FC<{
  user: ManualEntryUser;
}> = ({ user }) => {
  return (
    <Vertical>
      <LabelledText label="Name" value={user.name} />
      <LabelledText label="Mobile No." value={user.mobileNo} />
      <LabelledText label="Email" value={user.email} />
      <LabelledText label="Organization" value={user.organization} />
    </Vertical>
  );
};
