import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ConnectedFavourites } from "./index";

export default {
  title: "Components/Favourites V2",
  component: ConnectedFavourites,
} as ComponentMeta<typeof ConnectedFavourites>;

const Template: ComponentStory<typeof ConnectedFavourites> = (args) => (
  <ConnectedFavourites {...args} />
);
const deleteFavouriteApi = (id: string): Promise<string> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Favourite ${id} is deleted`);
      // reject(new Error(`Couldn't delete ${id}.`));
    }, 600);
  });
const checkinFavouriteApi = (id: string): Promise<string> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Favourite ${id} is checked in`);
      // reject(new Error(`Couldn't delete ${id}.`));
    }, 600);
  });

export const favouritesV2 = Template.bind({});
favouritesV2.args = {
  // deleteFavouriteApi,
  // checkinFavouriteApi,
};
favouritesV2.storyName = "Favourites V2";
