import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SelectField, SelectFieldProps } from "./index";
import Box from "@mui/material/Box";
import { action } from "@storybook/addon-actions";
// import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Select Field",
  component: SelectField,
} as ComponentMeta<typeof SelectField>;

const SelectFieldTemplate: ComponentStory<typeof SelectField> = (args) => (
  <Box sx={{ display: "flex", justifyContent: "center", marginY: 5 }}>
    <SelectField {...args} />
  </Box>
);
export const selectField = SelectFieldTemplate.bind({});
selectField.args = {
  labelId: "demo-simple-select-label",
  label: "Age",
  options: [
    { value: 1, label: <em>Select Age</em> },
    { value: 10, label: "Ten" },
    { value: 20, label: "Twenty" },
    { value: 30, label: "Thirty" },
  ],
  value: 1,
  onChange: action("onChange"),
  // ...restSelectProps,
} as SelectFieldProps;
