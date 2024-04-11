import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CardWithHeader } from "./CardWithHeader";
import { Typography } from "@mui/material";

const Story = {
  component: CardWithHeader,
  title: "features/ui/components/CardWithHeader",
} as ComponentMeta<typeof CardWithHeader>;

const Template: ComponentStory<typeof CardWithHeader> = (args) => (
  <CardWithHeader {...args} />
);

export const CardWithHeaderStory: ComponentStory<typeof CardWithHeader> =
  Template.bind({});
CardWithHeaderStory.args = {
  heading: "Abhyasi ID Checkin",
  children: <Typography>Children...</Typography>,
};

export default Story;
