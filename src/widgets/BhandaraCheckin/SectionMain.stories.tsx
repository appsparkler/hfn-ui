import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SectionMain } from "./SectionMain";

export default {
  title: "Widgets/Bhandara Checkin/Sections/Main",
  component: SectionMain,
} as ComponentMeta<typeof SectionMain>;

const Template: ComponentStory<typeof SectionMain> = () => <SectionMain />;
export const main = Template.bind({});
main.args = {};
