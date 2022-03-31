import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SignedInUserCheckIn, SignedInUserCheckInProps } from "./index";
import { uniqueId } from "lodash/fp";
import { action } from "@storybook/addon-actions";
import { genericCheckInVerbose } from "../GenericCheckInVerbose/index.stories";
import { GenericCheckInVerboseValue } from "../GenericCheckInVerbose";
export default {
  title: "Components/Signed In User Check In",
  component: SignedInUserCheckIn,
} as ComponentMeta<typeof SignedInUserCheckIn>;

const Template: ComponentStory<typeof SignedInUserCheckIn> = (args) => (
  <SignedInUserCheckIn {...args} />
);

const asyncSuccess =
  (actionName: string, successMessage: string, timeout: number = 600) =>
  (...args: any[]) => {
    action(actionName)(...args);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(successMessage);
      }, timeout);
    });
  };

const asyncFailure =
  (actionName: string, failureMessage: string, timeout: number = 600) =>
  (...args: any[]) => {
    action(actionName)(...args);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error(failureMessage));
      }, timeout);
    });
  };

export const example = Template.bind({});
example.args = {
  onCheckInUser: asyncFailure("onCheckInUser", "user is not registered", 600),
  onChangeVerboseUserInfo: action("onChangeVerboseUserInfo"),
  onCheckInVerboseUser: asyncSuccess(
    "onCheckInVerboseUser",
    "New user successfullly checked in"
  ),
  unRegisteredUserInfo: genericCheckInVerbose?.args
    ?.value as GenericCheckInVerboseValue,
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
  // onClickCheckIn: asyncFailure("onClickCheckIn", "You couldn't checkin", 600),
  onClickCheckIn: asyncSuccess(
    "onClickCheckIn",
    "Yay! You are checked in!",
    600
  ),
  onDeleteFavourite: asyncSuccess(
    "onDeleteFavourite",
    "fav user is deleted",
    600
  ),
  eventLocation: "Kanha Shanti Vanam",
  eventName: "Youth Seminar",
  isCheckedIn: false,
} as SignedInUserCheckInProps;
example.storyName = "Signed In User Check In";
