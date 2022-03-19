import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SelectField } from "./index";
import Box from "@mui/material/Box";
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
selectField.args = {};
