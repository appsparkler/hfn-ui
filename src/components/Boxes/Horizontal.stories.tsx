import { Box } from "@mui/material";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Horizontal } from "./Boxes";

export default {
  title: "Components/Layouts/Boxes/Horizontal",
  component: Horizontal,
} as ComponentMeta<typeof Horizontal>;

const Template: ComponentStory<typeof Horizontal> = () => (
  <Horizontal gap={5} color="text.primary">
    <Box>Horizontal</Box>
    <Box>Horizontal</Box>
    <Box>Horizontal</Box>
    <Box>Horizontal</Box>
  </Horizontal>
);
export const horizontal = Template.bind({});
horizontal.args = {};
