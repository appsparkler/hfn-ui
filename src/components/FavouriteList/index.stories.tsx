import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FavouriteList } from "./index";

export default {
  title: "Components/Favourites",
  component: FavouriteList,
} as ComponentMeta<typeof FavouriteList>;

const Template: ComponentStory<typeof FavouriteList> = (args) => (
  <FavouriteList {...args} />
);

export const favourites = Template.bind({});
favourites.args = {
  favourites: [
    { abhyasiId: "INAAAE478", id: "1", name: "Prashant Mishra" },
    { abhyasiId: "INAAAE478", id: "2", name: "Nandini N" },
    { abhyasiId: "INAAAE478", id: "3", name: "Adithi Sharma" },
  ],
};
