import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { GenericCheckIn } from "./index";
import random from "lodash/fp/random";
import uniqueId from "lodash/uniqueId";
import { action } from "@storybook/addon-actions";
import { genericCheckInVerbose } from "../GenericCheckInVerbose/index.stories";
import { GenericCheckInVerboseValue } from "../GenericCheckInVerbose";

export default {
  title: "Components/Generic Check In",
  component: GenericCheckIn,
} as ComponentMeta<typeof GenericCheckIn>;

const Template: ComponentStory<typeof GenericCheckIn> = (args) => (
  <GenericCheckIn {...args} />
);

export const genericCheckIn = Template.bind({});
genericCheckIn.args = {
  onChangeVerboseUserInfo: action("onChangeVerboseUserInfo"),
  onCheckInVerboseUser: action("onCheckInVerboseUser"),
  unRegisteredUserInfo: genericCheckInVerbose?.args
    ?.value as GenericCheckInVerboseValue,
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
        // if (random(1)(2) === 1) resolve("checked in user");
        // else
        reject(new Error("user not registered"));
      }, 600);
    });
  },
  onDeleteFavourite: (...args) => {
    action("onDeleteFavourite")(...args);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (random(1)(2) === 1) resolve("user deleted");
        else
          reject(
            new Error("couldn't delete the favourite.  Please try again.")
          );
      }, 600);
    });
  },
};
