import { ComponentMeta, ComponentStory } from "@storybook/react";
import { uniqueId } from "lodash/fp";
import { OfflineDataItem } from "widgets/BhandaraCheckin/types/components/OfflineData";
import { OfflineData } from "./OfflineData";

const Story = {
  component: OfflineData,
  title: "Widgets/Bhandara Checkin/Sections/OfflineData",
} as ComponentMeta<typeof OfflineData>;

const Template: ComponentStory<typeof OfflineData> = (args = {}) => (
  <OfflineData {...args} />
);

export const offlineData: ComponentStory<typeof OfflineData> = Template.bind(
  {}
);
offlineData.args = {
  data: [createData("INAAAE393"), createData("Aakash Shah, +917338080855")],
};

export const withoutData: ComponentStory<typeof OfflineData> = Template.bind(
  {}
);
withoutData.args = {
  data: [],
};

export default Story;
function createData(info: string): OfflineDataItem {
  return { id: uniqueId("offline-checkin-data"), info };
}
