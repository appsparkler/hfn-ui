import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SectionUpdateDetails } from "./SectionUpdateDetails";

export default {
  title: "Widgets/Bhandara Checkin/Sections/Update Details",
  component: SectionUpdateDetails,
} as ComponentMeta<typeof SectionUpdateDetails>;

const Template: ComponentStory<typeof SectionUpdateDetails> = (args) => (
  <SectionUpdateDetails {...args} />
);
export const updateDetails = Template.bind({});
updateDetails.args = {
  show: true,
};
