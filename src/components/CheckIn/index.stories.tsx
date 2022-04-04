import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CheckIn } from "./index";
import { action } from "@storybook/addon-actions";
import { genericCheckInVerbose as genericCheckInVerboseStories } from "../GenericCheckInVerbose/index.stories";

export default {
  title: "Apps/Check In",
  component: CheckIn,
} as ComponentMeta<typeof CheckIn>;

const Template: ComponentStory<typeof CheckIn> = (args) => (
  <CheckIn {...args} />
);

export const checkIn = Template.bind({});
checkIn.args = {
  isCheckedIn: false,
  eventLocation: "Kanha Shanti Vanam",
  eventName: "Youth Seminar",
  favourites: [],
  isSignedIn: false,
  unRegisteredUserInfo: genericCheckInVerboseStories.args?.value,
  onChangeVerboseUserInfo: action("onChangeVerboseUserInfo"),
  onCheckInUser: action("onCheckInUser"),
  onCheckInVerboseUser: action("onCheckInVerboseUser"),
  onClickBackButton: action("onClickBackButton"),
  onClickCheckIn: action("onClickCheckIn"),
};
