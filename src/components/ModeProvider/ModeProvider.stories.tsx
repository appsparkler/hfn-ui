import { Typography } from "@mui/material";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ModeProvider } from "./ModeProvider";

export default {
  title: "Components/Mode Provider",
  component: ModeProvider,
} as ComponentMeta<typeof ModeProvider>;

const Template: ComponentStory<typeof ModeProvider> = (args) => (
  <ModeProvider {...args}>
    <Typography variant="h4">
      This is placed at the center of the viewport 😎
    </Typography>
  </ModeProvider>
);
export const centerOfViewport = Template.bind({});
centerOfViewport.args = {
  mode: "dark",
};
