import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ThemeShowcase } from "./ThemeShowcase";

const Story = {
  component: ThemeShowcase,
  title: "components/theme",
} as ComponentMeta<typeof ThemeShowcase>;

const Template: ComponentStory<typeof ThemeShowcase> = () => <ThemeShowcase />;

export const themeShowcase: ComponentStory<typeof ThemeShowcase> =
  Template.bind({});
themeShowcase.args = {};

export default Story;
