import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SectionCheckinSuccess } from "./SectionCheckInSuccess";

export default {
  title: "Widgets/Bhandara Checkin/Sections/Check In Success",
  component: SectionCheckinSuccess,
} as ComponentMeta<typeof SectionCheckinSuccess>;

const Template: ComponentStory<typeof SectionCheckinSuccess> = (args) => (
  <SectionCheckinSuccess {...args} />
);
export const checkInSuccess = Template.bind({});
checkInSuccess.args = {};
