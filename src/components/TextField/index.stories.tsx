import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CustomTextField, CustomTextFieldProps } from "./index";
import Box from "@mui/material/Box";
import { action } from "@storybook/addon-actions";
// import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Custom Text Field",
  component: CustomTextField,
} as ComponentMeta<typeof CustomTextField>;

const SelectFieldTemplate: ComponentStory<typeof CustomTextField> = (args) => (
  <Box sx={{ display: "flex", justifyContent: "center", marginY: 5 }}>
    <CustomTextField {...args} />
  </Box>
);
export const customTextField = SelectFieldTemplate.bind({});
customTextField.args = {
  error: false,
  label: "First Name",
  // helperText: "Please select the age",
  value: 1,
  onChange: action("onChange"),
} as CustomTextFieldProps;
