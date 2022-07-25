import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Dashboard } from "./Dashboard";

const Story = {
  component: Dashboard,
  title: "Widgets/Bhandara Checkin/Sections/Dashboard",
} as ComponentMeta<typeof Dashboard>;

const Template: ComponentStory<typeof Dashboard> = (args) => (
  <Dashboard {...args} />
);

export const dashboard: ComponentStory<typeof Dashboard> = Template.bind({});
dashboard.args = {
  stats: {
    abhyasiIdCheckin: 20354,
    emailOrMobileCheckin: 3400,
    checkinsWithEmail: 400,
    checkinsWithMobile: 3000,
    city: {},
    country: {},
    female: 0,
    male: 0,
    state: {},
    unspecified: 0,
  },
};

export default Story;
