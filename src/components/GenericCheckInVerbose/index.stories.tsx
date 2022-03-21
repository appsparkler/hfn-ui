import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { GenericCheckInVerbose, GenericCheckInVerboseProps } from "./index";
import { Box } from "@mui/system";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Generic Check In Verbose",
  component: GenericCheckInVerbose,
} as ComponentMeta<typeof GenericCheckInVerbose>;

const Template: ComponentStory<typeof GenericCheckInVerbose> = (args) => (
  <Box marginY={3}>
    <GenericCheckInVerbose {...args} />
  </Box>
);

export const genericCheckInVerbose = Template.bind({});
genericCheckInVerbose.args = {
  value: {
    fullName: {
      value: "",
      error: false,
      helperText: "",
    },
    ageGroup: {
      value: 0,
      error: false,
      helperText: "",
    },
    gender: {
      value: 0,
      error: false,
      helperText: "",
    },
    location: {
      value: undefined,
      error: false,
      helperText: "",
    },
    email: {
      value: "",
      error: false,
      helperText: "",
    },
  },
  onChange: action("onChange"),
  onClickCancel: action("onClickCancel"),
  onClickCheckIn: action("onClickCheckIn"),
} as GenericCheckInVerboseProps;
