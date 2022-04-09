import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LocationTextField } from "./LocationTextField";
import Box from "@mui/material/Box";

export default {
  title: "Components/Location Input Field",
  component: LocationTextField,
} as ComponentMeta<typeof LocationTextField>;

const Template: ComponentStory<typeof LocationTextField> = (args) => (
  <Box sx={{ display: "flex", justifyContent: "center", marginY: 5 }}>
    <LocationTextField {...args} />
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
};
