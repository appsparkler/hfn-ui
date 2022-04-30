import { MUISwitch } from "./MUISwitch";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Switches",
  component: MUISwitch,
} as ComponentMeta<typeof MUISwitch>;

const Template: ComponentStory<typeof MUISwitch> = (args) => (
  <MUISwitch {...args} />
);

export const muiSwitch = Template.bind({});
muiSwitch.args = {
  checked: false,
};
