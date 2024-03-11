import { QrCode2 } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Fab,
  TextField,
  Typography,
} from "@mui/material";
import { Vertical } from "components";
import React, { ChangeEvent } from "react";
import { ManualEntryUser } from "widgets/GSM/model/ManualEntryUser";
import { isValidUser } from "./utils/isValidUser";

const maxWidth = 420;

export interface IHomeScreenProps {
  user: ManualEntryUser;
}

export const HomeScreen: React.FC<
  {
    onClickCheckin: () => void;
    onClickScan: () => void;
    onChangeUserDetails: (user: ManualEntryUser) => void;
  } & IHomeScreenProps
> = ({ user, onClickCheckin, onChangeUserDetails, onClickScan }) => {
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = event.target;
    onChangeUserDetails({
      ...user,
      [name]: value,
    });
  }

  return (
    <Vertical mx="auto" justifyContent={"center"} alignItems={"center"}>
      <Card
        sx={{
          m: 2,
          maxWidth: maxWidth,
          opacity: 0.86,
        }}
      >
        <CardContent>
          <Vertical alignItems={"center"} gap={2}>
            <img src={"image.webp"} alt={""} width="100%" />
            <Typography variant="h5" align="center">
              Global Spirituality Mahotsav
            </Typography>
            <TextField
              type="text"
              label="Name"
              name="name"
              variant="standard"
              required
              autoComplete="off"
              helperText={"Please enter name as displayed on the ID card"}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              type="tel"
              name="mobileNo"
              label="Mobile No."
              variant="standard"
              fullWidth
              autoComplete="off"
              onChange={handleChange}
            />
            <TextField
              type="email"
              label="Email"
              name="email"
              variant="standard"
              fullWidth
              autoComplete="off"
              onChange={handleChange}
            />
            <TextField
              type="text"
              label="Organization"
              name="organization"
              variant="standard"
              fullWidth
              autoComplete="off"
              onChange={handleChange}
            />
            <Button
              type="button"
              variant="contained"
              onClick={onClickCheckin}
              disabled={!isValidUser(user)}
            >
              CHECK IN
            </Button>
          </Vertical>
        </CardContent>
      </Card>
      <Fab
        type="button"
        variant="circular"
        color="secondary"
        onClick={onClickScan}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
        }}
      >
        <QrCode2 />
      </Fab>
    </Vertical>
  );
};
