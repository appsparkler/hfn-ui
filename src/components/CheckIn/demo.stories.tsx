import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CheckInDemo } from "./demo";

export default {
  title: "Apps/Check In",
  component: CheckInDemo,
} as ComponentMeta<typeof CheckInDemo>;

const Template: ComponentStory<typeof CheckInDemo> = () => <CheckInDemo />;

export const demo = Template.bind({});
demo.args = {};
