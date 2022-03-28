import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CheckIn } from "./index";

export default {
  title: "Apps/Check In",
  component: CheckIn,
} as ComponentMeta<typeof CheckIn>;

const Template: ComponentStory<typeof CheckIn> = (args) => (
  <CheckIn {...args} />
);

export const checkIn = Template.bind({});
checkIn.args = {};
