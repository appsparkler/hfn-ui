import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BhandaraCheckinWidgetDemo } from "./BhandaraCheckinDemo";

export default {
  title: "Widgets/Bhandara Checkin/Demo",
  component: BhandaraCheckinWidgetDemo,
} as ComponentMeta<typeof BhandaraCheckinWidgetDemo>;

const Template: ComponentStory<typeof BhandaraCheckinWidgetDemo> = () => (
  <BhandaraCheckinWidgetDemo />
);
export const demo = Template.bind({});
demo.args = {};
