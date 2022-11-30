import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CheckinInfoTile } from "./CheckinInfoTile";

const Story = {
  component: CheckinInfoTile,
  title: "Components/Checkin Info Tile",
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
  id: "tile-1",
  birthPreference: "LB",
  dormPreference: "East Comform Dorm - B1",
};

export default Story;
