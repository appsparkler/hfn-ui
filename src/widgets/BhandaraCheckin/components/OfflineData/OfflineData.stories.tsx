import { ComponentMeta, ComponentStory } from "@storybook/react";
import { OfflineData } from "./OfflineData";

const Story = {
  component: OfflineData,
  title: "Widgets/Bhandara Checkin/Sections/OfflineData",
} as ComponentMeta<typeof OfflineData>;

const Template: ComponentStory<typeof OfflineData> = (args = {}) => (
  <OfflineData />
);

export const offlineData: ComponentStory<typeof OfflineData> = Template.bind(
  {}
);
offlineData.args = {};

export default Story;
