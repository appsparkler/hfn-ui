import React, { useCallback, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  AsyncButton,
  AsyncButtonProps,
  GenericCheckIn,
  GenericCheckInProps,
} from "./index";
import { random, uniqueId } from "lodash/fp";
import { action } from "@storybook/addon-actions";
import Button from "@mui/material/Button";
import { ClickHandler } from "../SignedInUserCheckIn";
import {
  Alert,
  AlertColor,
  Box,
  CircularProgress,
  Snackbar,
} from "@mui/material";

export default {
  title: "Components/Generic Check In",
  component: GenericCheckIn,
} as ComponentMeta<typeof GenericCheckIn>;

const Template: ComponentStory<typeof GenericCheckIn> = (args) => (
  <GenericCheckIn {...args} />
);

const label = "Sign In";

export const SignInSignOutButton = ({
  onClick = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (random(1)(2) === 1) resolve();
        else reject("API failed");
      }, 500);
    });
  },
  disabled,
  successMessage = "Done!",
  errorMessage = "Oops! Something went wrong!",
}: {
  onClick: ClickHandler;
  disabled?: boolean;
  errorMessage: string;
  successMessage: string;
}) => {
  const [snackbar, setSnackbar] = useState<{
    isOpen: boolean;
    message: string;
    severity: AlertColor;
  }>({
    isOpen: false,
    message: "",
    severity: "error",
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const handleClick = useCallback<ClickHandler>(
    async (evt) => {
      setIsProcessing(true);
      try {
        await onClick(evt);
        setSnackbar({
          isOpen: true,
          message: successMessage,
          severity: "success",
        });
      } catch (e) {
        setSnackbar({
          isOpen: true,
          message: errorMessage,
          severity: "error",
        });
      } finally {
        setIsProcessing(false);
      }
    },
    [errorMessage, onClick, successMessage]
  );
  const handleSnackbarClose = useCallback(() => {
    setSnackbar({ isOpen: false, message: "", severity: undefined });
  }, []);
  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <Button
        variant="contained"
        type="button"
        onClick={handleClick}
        disabled={disabled || Boolean(isProcessing)}
      >
        {label}
      </Button>
      {isProcessing && (
        <CircularProgress
          sx={{
            position: "absolute",
            left: "calc(50% - 10px)",
            top: "calc(50% - 10px)",
          }}
          size={20}
        />
      )}
      <Snackbar
        open={snackbar.isOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          onClose={handleSnackbarClose}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export const example = Template.bind({});

example.args = {
  eventName: "Youth Seminar",
  eventLocation: "Kanha Shanti Vanam",
  favourites: [
    {
      name: "Prakash Mishra",
      id: uniqueId("favourite-"),
      abhyasiId: "INABC2323",
    },
    {
      name: "Gayathri Devaswami",
      id: uniqueId("favourite-"),
      email: "ookla@dribble.com",
    },
  ],
  onCheckInFavourite: (id) => {
    action("onCheckInFavourite")(id);
    if (random(1)(2) === 1) throw new Error("Oops! something went wrong");
  },
} as GenericCheckInProps;

const AsyncButtonTemplate: ComponentStory<typeof AsyncButton> = (args) => (
  <AsyncButton {...args} />
);

export const asyncButton = AsyncButtonTemplate.bind({});
asyncButton.args = {
  label: "Check In",
  onClick: () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (random(1)(2) === 1) resolve("success");
        else reject();
      }, 600);
    }),
  successMessage: "Prakash is checked in",
  errorMessage: "Prakash Mishra not checked in",
} as AsyncButtonProps;
