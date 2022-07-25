import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DashboardV0 } from "./Dashboard";

const Story = {
  component: DashboardV0,
  title: "Widgets/Bhandara Checkin/Sections/Dashboard V0",
} as ComponentMeta<typeof DashboardV0>;

const Template: ComponentStory<typeof DashboardV0> = (args = {}) => (
  <DashboardV0 {...args} />
);

export const dashboard: ComponentStory<typeof DashboardV0> = Template.bind({});
dashboard.args = {};

export default Story;
