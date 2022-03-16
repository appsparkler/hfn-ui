import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { GenericCheckIn, GenericCheckInProps } from "./index";
import { uniqueId } from "lodash/fp";

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
    { name: "Prakash Mishra", id: uniqueId("favourite-") },
    { name: "Gayathri Devaswami", id: uniqueId("favourite-") },
  ],
} as GenericCheckInProps;
