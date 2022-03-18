import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SignedInUserCheckIn, SignedInUserCheckInProps } from "./index";
import { uniqueId } from "lodash/fp";
import { action } from "@storybook/addon-actions";
export default {
  title: "Components/Signed In User Check In",
  component: SignedInUserCheckIn,
} as ComponentMeta<typeof SignedInUserCheckIn>;

const Template: ComponentStory<typeof SignedInUserCheckIn> = (args) => (
  <SignedInUserCheckIn {...args} />
);

const asyncSuccess =
  (actionName: string, successMessage: string, timeout: number = 600) =>
  (...args) => {
    action(actionName)(...args);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(successMessage);
      }, timeout);
    });
  };

export const example = Template.bind({});
example.args = {
  onCheckInUser: asyncSuccess(
    "onCheckInUser",
    "user is checked in with mobile#/email/abhyasi-id",
    600
  ),
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
  onCheckInFavourite: asyncSuccess(
    "oCheckInfavourite",
    "fav is checked in",
    600
  ),
  onClickCheckIn: asyncSuccess(
    "onClickCheckIn",
    "signed-in user is checked in",
    600
  ),
  onDeleteFavourite: asyncSuccess(
    "onDeleteFavourite",
    "fav user is deleted",
    600
  ),
  eventLocation: "Kanha Shanti Vanam",
  eventName: "Youth Seminar",
} as SignedInUserCheckInProps;
example.storyName = "Signed In User Check In";
