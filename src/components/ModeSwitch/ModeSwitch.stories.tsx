import { ModeSwitch } from "./ModeSwitch";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Switches/Mode Switch",
  component: ModeSwitch,
} as ComponentMeta<typeof ModeSwitch>;

const Template: ComponentStory<typeof ModeSwitch> = (args) => (
  <ModeSwitch {...args} />
);

export const modeSwitch = Template.bind({});
modeSwitch.args = {
  checked: false,
};
