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
multipleCheckin.args = {
  items: [
    { id: 1, checked: false, name: "A***Y C***A" },
    { id: 2, checked: true, name: "M**** J****SON", disabled: true },
    { id: 3, checked: true, name: "A***H B*****N" },
  ],
};
