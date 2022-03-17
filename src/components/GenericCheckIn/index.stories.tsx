import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { GenericCheckIn, GenericCheckInProps } from "./index";
import random from "lodash/fp/random";
import uniqueId from "lodash/uniqueId";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Generic Check In",
  component: GenericCheckIn,
} as ComponentMeta<typeof GenericCheckIn>;

const Template: ComponentStory<typeof GenericCheckIn> = (args) => (
  <GenericCheckIn {...args} />
);

export const genericCheckIn = Template.bind({});
genericCheckIn.args = {
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
  onCheckInFavourite: (...args) => {
    action("onCheckInFavourite")(...args);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (random(1)(2) === 1) resolve("checked in fav user");
        else reject(new Error("couldn't check-in fav user"));
      }, 600);
    });
  },
  onCheckInUser: (...args) => {
    action("onCheckInUser")(...args);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (random(1)(2) === 1) resolve("checked in user");
        else reject(new Error("user not registered"));
      }, 600);
    });
  },
} as GenericCheckInProps;
