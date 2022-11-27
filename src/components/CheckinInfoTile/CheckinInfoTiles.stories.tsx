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
checkinInfoTiles.args = {};

export default Story;
