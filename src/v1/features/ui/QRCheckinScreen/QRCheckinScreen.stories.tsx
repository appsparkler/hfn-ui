import { ComponentMeta, ComponentStory } from "@storybook/react";
import { QRCheckinScreen } from "./QRCheckinScreen";

const Story = {
  component: QRCheckinScreen,
  title: "features/ui/QRCheckinScreen",
} as ComponentMeta<typeof QRCheckinScreen>;

const Template: ComponentStory<typeof QRCheckinScreen> = (args) => (
  <QRCheckinScreen {...args} />
);

export const QRCheckinScreenStory: ComponentStory<typeof QRCheckinScreen> =
  Template.bind({});
QRCheckinScreenStory.args = {
  checkins: [
    {
      fullName: "Amit Mishra",
      abhyasiId: "EIIIX393",
      batch: "batch-2, batch-1",
      berthPreference: "UB",
      dormPreference: "East ABC Dorm",
      dormAndBerthAllocation: "",
      eventName: "Bhandara",
      isSelected: false,
      pnr: "33-333-3333",
      registrationId: "29292-2323-2323-21111",
    },
    {
      fullName: "Arun Solanki",
      abhyasiId: "EIIIX393",
      batch: "batch-2, batch-1",
      berthPreference: "",
      dormPreference: "",
      dormAndBerthAllocation: "",
      eventName: "Bhandara",
      isSelected: true,
      pnr: "33-333-3333",
      registrationId: "29292-2323-2323-21111",
    },
  ],
};
QRCheckinScreenStory.storyName = "QR Checkin Screen";

export default Story;
