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
  fullName: "Shekhar Kapoor",
  abhyasiId: "tile-1",
  birthPreference: "LB",
  dormPreference: "East Comform Dorm - B1",
};

export default Story;
