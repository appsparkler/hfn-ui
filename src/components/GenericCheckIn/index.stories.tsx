import React, { useCallback, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { GenericCheckIn, GenericCheckInProps } from "./index";
import { random, uniqueId } from "lodash/fp";
import { action } from "@storybook/addon-actions";
import Button from "@mui/material/Button";
import { ClickHandler } from "../SignedInUserCheckIn";
import { Box, CircularProgress } from "@mui/material";

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
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  },
  disabled,
}: {
  onClick: ClickHandler;
  disabled?: boolean;
}) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const handleClick = useCallback<ClickHandler>(
    async (evt) => {
      setIsProcessing(true);
      try {
        await onClick(evt);
      } catch (e) {
        throw new Error(e);
      } finally {
        setIsProcessing(false);
      }
    },
    [onClick]
  );
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
