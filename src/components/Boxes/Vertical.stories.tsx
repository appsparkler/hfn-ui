import { Box } from "@mui/material";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Vertical } from "./Boxes";

export default {
  title: "Components/Layouts/Boxes/Vertical",
  component: Vertical,
} as ComponentMeta<typeof Vertical>;

const Template: ComponentStory<typeof Vertical> = () => (
  <Vertical gap={5}>
    <Box>Vertical</Box>
    <Box>Vertical</Box>
    <Box>Vertical</Box>
    <Box>Vertical</Box>
  </Vertical>
);
export const vertical = Template.bind({});
vertical.args = {};
