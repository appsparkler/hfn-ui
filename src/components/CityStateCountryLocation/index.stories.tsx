import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LocationInputField, LocationInputFieldProps } from "./index";
import Box from "@mui/material/Box";

export default {
  title: "Components/Async SelectField",
  component: LocationInputField,
} as ComponentMeta<typeof LocationInputField>;

const AsyncButtonTemplate: ComponentStory<typeof LocationInputField> = (
  args
) => (
  <Box sx={{ display: "flex", justifyContent: "center", marginY: 5 }}>
    <LocationInputField {...args} />
  </Box>
);
export const asyncButton = AsyncButtonTemplate.bind({});
asyncButton.args = {} as LocationInputFieldProps;
