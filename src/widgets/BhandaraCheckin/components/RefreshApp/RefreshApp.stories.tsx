import { ComponentMeta, ComponentStory } from "@storybook/react";
import { RefreshApp } from "./RefreshApp";

const Story = {
  component: RefreshApp,
  title: "Widgets/Bhandara Checkin/Sections/RefreshApp",
} as ComponentMeta<typeof RefreshApp>;

const Template: ComponentStory<typeof RefreshApp> = (args = {}) => (
  <RefreshApp {...args} />
);

export const refreshApp: ComponentStory<typeof RefreshApp> = Template.bind({});
refreshApp.args = {};

export default Story;
