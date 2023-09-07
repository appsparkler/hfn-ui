import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CheckinInfoTile } from "./CheckinInfoTile";

const Story = {
  component: CheckinInfoTile,
  title:
    "Widgets/Bhandara Checkin/Sections/Multi Checkin Screen/Checkin Info Tile",
} as ComponentMeta<typeof CheckinInfoTile>;

const Template: ComponentStory<typeof CheckinInfoTile> = (args) => {
  return (
    <CheckinInfoTile
      {...args}
      onCheck={args.onCheck}
      onChangeDormAllocation={args.onChangeDormAllocation}
    />
  );
};

export const checkinInfoTile: ComponentStory<typeof CheckinInfoTile> =
  Template.bind({});
checkinInfoTile.args = {
  eventName: "2023 Birth Anniversary Celebrations of Pujya Daaji",
  batch: "batch-1",
  regId: "b366daa6-2960-4a8b-a300-29bb05ae4e46",
  orderId: "Bhandara Sept 2023",
  fullName: "Shekhar Kapoor",
  abhyasiId: "INAAAE383",
  berthPreference: "LB",
  dormPreference: "East Comform Dorm - B1",
};

export default Story;
