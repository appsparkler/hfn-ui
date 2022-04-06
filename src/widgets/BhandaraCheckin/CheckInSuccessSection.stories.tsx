import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CheckinSuccessSection } from "./CheckInSuccessSection";

export default {
  title: "Widgets/Bhandara Checkin/Check In Success Section",
  component: CheckinSuccessSection,
} as ComponentMeta<typeof CheckinSuccessSection>;

const Template: ComponentStory<typeof CheckinSuccessSection> = (args) => (
  <CheckinSuccessSection {...args} />
);
export const checkInSuccessSection = Template.bind({});
checkInSuccessSection.args = {};
