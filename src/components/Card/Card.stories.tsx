import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MultiActionAreaCard } from "./Card";

const Story = {
  component: MultiActionAreaCard,
  title: "Components/Card",
} as ComponentMeta<typeof MultiActionAreaCard>;

const Template: ComponentStory<typeof MultiActionAreaCard> = (args) => (
  <MultiActionAreaCard {...args} />
);

export const card: ComponentStory<typeof MultiActionAreaCard> = Template.bind(
  {}
);
card.args = {
  fullName: "Shekhar Kapoor",
  id: "tile-1",
  birthPreference: "LB",
  dormPreference: "East Comform Dorm - B1",
};

export default Story;
