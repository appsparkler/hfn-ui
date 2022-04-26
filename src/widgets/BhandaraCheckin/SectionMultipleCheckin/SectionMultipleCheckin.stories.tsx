import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SectionMultipleCheckin } from "./SectionMultipleCheckin";

export default {
  title: "Widgets/Bhandara Checkin/Sections/Multiple Checkin",
  component: SectionMultipleCheckin,
} as ComponentMeta<typeof SectionMultipleCheckin>;

const Template: ComponentStory<typeof SectionMultipleCheckin> = (args) => (
  <SectionMultipleCheckin {...args} />
);
export const multipleCheckin = Template.bind({});
multipleCheckin.args = {};
