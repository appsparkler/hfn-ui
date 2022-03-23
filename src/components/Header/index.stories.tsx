import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AppBar, AppBarProps } from "./index";
export default {
  title: "Components/App Header",
  component: AppBar,
} as ComponentMeta<typeof AppBar>;

const Template: ComponentStory<typeof AppBar> = (args) => <AppBar {...args} />;

export const unSignedInUserCheckIn = Template.bind({});
unSignedInUserCheckIn.args = {
  eventName: "Youth Seminar",
  eventLocation: "Kanha Shanti Vanam",
} as AppBarProps;
