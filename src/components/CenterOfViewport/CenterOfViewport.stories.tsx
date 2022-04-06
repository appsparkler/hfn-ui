import { Typography } from "@mui/material";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CenterOfViewport } from "./CenterOfViewport";

export default {
  title: "Components/Center Of Viewport",
  component: CenterOfViewport,
} as ComponentMeta<typeof CenterOfViewport>;

const Template: ComponentStory<typeof CenterOfViewport> = () => (
  <CenterOfViewport>
    <Typography variant="h4">
      This is placed at the center of the viewport 😎
    </Typography>
  </CenterOfViewport>
);
export const centerOfViewport = Template.bind({});
centerOfViewport.args = {};
