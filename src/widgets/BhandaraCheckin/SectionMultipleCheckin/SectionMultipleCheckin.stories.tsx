import { ComponentMeta, ComponentStory } from "@storybook/react";
import { uniqueId } from "lodash";
import { SectionMultipleCheckin } from "./SectionMultipleCheckin";

const uniqueIdCheckboxItem = () => uniqueId("checkbox-item");

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
    {
      id: uniqueIdCheckboxItem(),
      checked: true,
      name: "A***Y C***A",
    },
    {
      id: uniqueIdCheckboxItem(),
      checked: true,
      name: "M**** J****SON",
      disabled: true,
    },
    {
      id: uniqueIdCheckboxItem(),
      checked: false,
      name: "A***H B*****N",
    },
  ],
};
