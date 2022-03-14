import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CheckIn } from "./index";

export default {
  title: "Components/Check In",
  component: CheckIn,
} as ComponentMeta<typeof CheckIn>;

const Template: ComponentStory<typeof CheckIn> = (args) => (
  <CheckIn {...args} />
);

export const example = Template.bind({});
example.args = {};
