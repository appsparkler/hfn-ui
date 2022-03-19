import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextFieldWithLabel, TextFieldWithLabelProps } from "./index";
import Box from "@mui/material/Box";
import { action } from "@storybook/addon-actions";
// import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Text Field With Label",
  component: TextFieldWithLabel,
} as ComponentMeta<typeof TextFieldWithLabel>;

const Template: ComponentStory<typeof TextFieldWithLabel> = (args) => (
  <Box sx={{ display: "flex", justifyContent: "center", marginY: 5 }}>
    <TextFieldWithLabel {...args} />
  </Box>
);
export const textFieldWithLabel = Template.bind({});
textFieldWithLabel.args = {
  label: "First Name",
  variant: "outlined",
  error: false,
  helperText: "Helper text for user.",
  required: false,
} as TextFieldWithLabelProps;
