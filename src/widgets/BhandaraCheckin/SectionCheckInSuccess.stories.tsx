import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CheckinSuccessSection } from "./SectionCheckInSuccess";

export default {
  title: "Widgets/Bhandara Checkin/Sections/Check In Success",
  component: CheckinSuccessSection,
} as ComponentMeta<typeof CheckinSuccessSection>;

const Template: ComponentStory<typeof CheckinSuccessSection> = (args) => (
  <CheckinSuccessSection {...args} />
);
export const checkInSuccess = Template.bind({});
checkInSuccess.args = {};
