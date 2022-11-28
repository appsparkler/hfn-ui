import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CheckinInfoTiles } from "./CheckinInfoTiles";

const Story = {
  component: CheckinInfoTiles,
  title: "components/Checkin Info Tiles",
} as ComponentMeta<typeof CheckinInfoTiles>;

const Template: ComponentStory<typeof CheckinInfoTiles> = (args = {}) => (
  <CheckinInfoTiles {...args} />
);

export const checkinInfoTiles: ComponentStory<typeof CheckinInfoTiles> =
  Template.bind({});
checkinInfoTiles.args = {
  data: [
    {
      id: "tile-1",
      fullName: "Jane Mathew",
      dormPreference: "East Comform Dorm - B1",
      birthPreference: "LB",
    },
    {
      id: "tile-2",
      fullName: "Shekhar Kapoor",
      dormPreference: "German Tent",
      birthPreference: "LB",
    },
    {
      id: "tile-3",
      fullName: "Shekhar Kapoor",
      dormPreference: "German Tent",
      birthPreference: "LB",
    },
  ],
};

export default Story;
