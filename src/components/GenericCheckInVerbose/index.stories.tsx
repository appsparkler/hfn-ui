import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { GenericCheckInVerbose, GenericCheckInVerboseProps } from "./index";
import { Box } from "@mui/system";

export default {
  title: "Components/Generic Check In Verbose",
  component: GenericCheckInVerbose,
} as ComponentMeta<typeof GenericCheckInVerbose>;

const Template: ComponentStory<typeof GenericCheckInVerbose> = (args) => (
  <Box marginY={3}>
    <GenericCheckInVerbose {...args} />
  </Box>
);

export const genericCheckInVerbose: {
  args: GenericCheckInVerboseProps;
} = Template.bind({});
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
} as GenericCheckInVerboseProps;
