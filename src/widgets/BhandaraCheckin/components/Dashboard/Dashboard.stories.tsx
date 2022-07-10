import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Dashboard } from "./Dashboard";

const Story = {
  component: Dashboard,
  title: "Widgets/Bhandara Checkin/Sections/Dashboard",
} as ComponentMeta<typeof Dashboard>;

const Template: ComponentStory<typeof Dashboard> = (args = {}) => (
  <Dashboard {...args} />
);

export const dashboard: ComponentStory<typeof Dashboard> = Template.bind({});
dashboard.args = {};

export default Story;
