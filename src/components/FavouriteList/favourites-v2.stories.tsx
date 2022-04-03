import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ConnectedFavourites } from "./index";

export default {
  title: "Components/Favourites V2",
  component: ConnectedFavourites,
} as ComponentMeta<typeof ConnectedFavourites>;

const Template: ComponentStory<typeof ConnectedFavourites> = (args) => (
  <ConnectedFavourites {...args} />
);

export const favouritesV2 = Template.bind({});
favouritesV2.args = {};
