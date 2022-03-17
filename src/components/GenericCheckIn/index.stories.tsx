import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { GenericCheckIn, GenericCheckInProps } from "./index";
import { noop, random, uniqueId } from "lodash/fp";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Generic Check In",
  component: GenericCheckIn,
} as ComponentMeta<typeof GenericCheckIn>;

const Template: ComponentStory<typeof GenericCheckIn> = (args) => (
  <GenericCheckIn {...args} />
);

export const example = Template.bind({});
example.args = {
  eventName: "Youth Seminar",
  eventLocation: "Kanha Shanti Vanam",
  favourites: [
    {
      name: "Prakash Mishra",
      id: uniqueId("favourite-"),
      abhyasiId: "INABC2323",
    },
    {
      name: "Gayathri Devaswami",
      id: uniqueId("favourite-"),
      email: "ookla@dribble.com",
    },
  ],
  onCheckInFavourite: (id) => {
    action("onCheckInFavourite")(id);
    if (random(1)(2) === 1) throw new Error("Oops! something went wrong");
  },
  onCheckInUser: noop,
} as GenericCheckInProps;
