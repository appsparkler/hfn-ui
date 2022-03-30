import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LocationInputField, LocationInputFieldProps } from "./index";
import Box from "@mui/material/Box";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Location Input Field",
  component: LocationInputField,
} as ComponentMeta<typeof LocationInputField>;

const Template: ComponentStory<typeof LocationInputField> = (args) => (
  <Box sx={{ display: "flex", justifyContent: "center", marginY: 5 }}>
    <LocationInputField {...args} />
  </Box>
);
export const locationInputField = Template.bind({});
locationInputField.args = {
  error: false,
  label: "City, State, Country",
  required: false,
  helperText: "Helper text for the user.",
  size: "medium",
  variant: "filled",
  api: "https://static-gatsby.web.app/srcmapi/cities",
  onChange: action("onChange"),
} as LocationInputFieldProps;
