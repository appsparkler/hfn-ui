import { ComponentMeta, ComponentStory } from "@storybook/react";
import { QRCheckinScreen } from "./QRCheckinScreen";

const Story = {
  component: QRCheckinScreen,
  title: "features/ui/QRCheckinScreen",
} as ComponentMeta<typeof QRCheckinScreen>;

const Template: ComponentStory<typeof QRCheckinScreen> = (args = {}) => (
  <QRCheckinScreen {...args} />
);

export const QRCheckinScreenStory: ComponentStory<typeof QRCheckinScreen> =
  Template.bind({});
QRCheckinScreenStory.args = {};
QRCheckinScreenStory.storyName = "QR Checkin Screen";

export default Story;
