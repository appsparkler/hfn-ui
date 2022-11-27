import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CheckinInfoTiles } from "./CheckinInfoTiles";

const Story = {
  component: CheckinInfoTiles,
  title: "components/Tiles",
} as ComponentMeta<typeof CheckinInfoTiles>;

const Template: ComponentStory<typeof CheckinInfoTiles> = (args = {}) => (
  <CheckinInfoTiles {...args} />
);

export const tiles: ComponentStory<typeof CheckinInfoTiles> = Template.bind({});
tiles.args = {};

export default Story;
