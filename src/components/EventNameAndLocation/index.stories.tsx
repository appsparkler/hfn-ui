import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { EventNameAndLocation, EventNameAndLocationProps } from "./index";

export default {
  title: "Components/Event Name And Location",
  component: EventNameAndLocation,
} as ComponentMeta<typeof EventNameAndLocation>;

const Template: ComponentStory<typeof EventNameAndLocation> = (args) => (
  <EventNameAndLocation {...args} />
);

export const example = Template.bind({});
example.args = {
  eventLocation: "Kanha Shanti Vanam",
  eventName: "Youth Seminar",
} as EventNameAndLocationProps;
example.storyName = "Event Name And Location";
