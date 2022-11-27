import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MultiActionAreaCard } from "./Card";

const Story = {
  component: MultiActionAreaCard,
  title: "Components/Card",
} as ComponentMeta<typeof MultiActionAreaCard>;

const Template: ComponentStory<typeof MultiActionAreaCard> = (args = {}) => (
  <MultiActionAreaCard />
);

export const card: ComponentStory<typeof MultiActionAreaCard> = Template.bind(
  {}
);
card.args = {};

export default Story;
