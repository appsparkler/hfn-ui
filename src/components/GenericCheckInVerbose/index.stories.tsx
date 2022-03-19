import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { GenericCheckInVerbose, GenericCheckInVerboseProps } from "./index";
import random from "lodash/fp/random";
import uniqueId from "lodash/uniqueId";
import { action } from "@storybook/addon-actions";
import { Box } from "@mui/system";

export default {
  title: "Components/Generic Check In Verbose",
  component: GenericCheckInVerbose,
} as ComponentMeta<typeof GenericCheckInVerbose>;

const Template: ComponentStory<typeof GenericCheckInVerbose> = (args) => (
  <Box marginY={3}>
    <GenericCheckInVerbose {...args} />
  </Box>
);

export const genericCheckInVerbose = Template.bind({});
genericCheckInVerbose.args = {
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
} as GenericCheckInVerboseProps;
