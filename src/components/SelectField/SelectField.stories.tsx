import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SelectField } from "./SelectField";
import Box from "@mui/material/Box";

export default {
  title: "Components/Form Controls/Select Field",
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
  error: false,
  label: "Age",
  helperText: "Please select the age",
  required: false,
  name: "age-group",
  options: [
    { value: 1, label: <em>Select Age</em> },
    { value: 10, label: "Ten" },
    { value: 20, label: "Twenty" },
    { value: 30, label: "Thirty" },
  ],
  value: "",
};
