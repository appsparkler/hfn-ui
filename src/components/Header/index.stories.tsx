import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AppHeader, AppHeaderProps } from "./index";
export default {
  title: "Components/App Header",
  component: AppHeader,
} as ComponentMeta<typeof AppHeader>;

const Template: ComponentStory<typeof AppHeader> = (args) => (
  <AppHeader {...args} />
);

export const appHeader = Template.bind({});
appHeader.args = {
  eventName: "Youth Seminar",
  eventLocation: "Kanha Shanti Vanam",
} as AppHeaderProps;
