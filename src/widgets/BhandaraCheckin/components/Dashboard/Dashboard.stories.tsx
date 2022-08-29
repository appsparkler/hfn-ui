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
    city: {
      Ahmedabad: 10,
      Bangalore: 20,
      Chennai: 30,
    },
    country: {
      India: 20354,
      USA: 3400,
    },
    female: 0,
    male: 0,
    state: {
      Karnataka: 10,
      "Madhya Pradesh": 20,
      Telangana: 40,
    },
    unspecified: 0,
    dataAppendedForPreviousCheckins: false,
  },
};

export const loadingState: ComponentStory<typeof Dashboard> = Template.bind({});
loadingState.args = {};

export default Story;
