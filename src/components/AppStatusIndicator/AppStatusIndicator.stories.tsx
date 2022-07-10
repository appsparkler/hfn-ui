import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AppStatusIndicator } from "./AppStatusIndicator";

const Story = {
  component: AppStatusIndicator,
  title: "Components/AppStatusIndicator",
} as ComponentMeta<typeof AppStatusIndicator>;

const Template: ComponentStory<typeof AppStatusIndicator> = () => (
  <AppStatusIndicator />
);

export const appStatusIndicator: ComponentStory<typeof AppStatusIndicator> =
  Template.bind({});
appStatusIndicator.args = {};

export default Story;
