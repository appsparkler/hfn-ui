import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AppUpdater } from "./AppUpdater";

const Story = {
  component: AppUpdater,
  title: "Components/AppUpdater",
} as ComponentMeta<typeof AppUpdater>;

const Template: ComponentStory<typeof AppUpdater> = (args = {}) => (
  <AppUpdater {...args} />
);

export const appUpdater: ComponentStory<typeof AppUpdater> = Template.bind({});
appUpdater.args = {};

export default Story;
