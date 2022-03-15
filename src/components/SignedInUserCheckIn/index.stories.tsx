import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SignedInUserCheckIn, SignedInUserCheckInProps } from "./index";

export default {
  title: "Components/Signed In User Check In",
  component: SignedInUserCheckIn,
} as ComponentMeta<typeof SignedInUserCheckIn>;

const Template: ComponentStory<typeof SignedInUserCheckIn> = (args) => (
  <SignedInUserCheckIn {...args} />
);

export const example = Template.bind({});
example.args = {} as SignedInUserCheckInProps;
