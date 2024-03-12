import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { SuccessScreen } from "./SuccessScreen";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Widgets/GSM/features/Success Screen",
  component: SuccessScreen,
  argTypes: {},
} as ComponentMeta<typeof SuccessScreen>;
export default meta;
// type Story = StoryObj<typeof HomeScreen>;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SuccessScreenStory: ComponentStory<typeof SuccessScreen> = (args) => (
  <SuccessScreen {...args} />
);
SuccessScreenStory.args = {
  manualEntryUser: {
    name: "Abdul Rehman",
    checkinTime: Date.now(),
    email: "XV7pT@example.com",
    mobileNo: "0300-1234567",
    organization: "Global Spirituality Mahotsav",
    platform: "WEB",
    uid: "user-1234"
  }
};

SuccessScreenStory.storyName = "Manual Entry";

export const QRUserSuccessScreen: ComponentStory<typeof SuccessScreen> = (
  args
) => <SuccessScreen {...args} />;
QRUserSuccessScreen.args = {
  qrUser: {
    name: "Abdul Rehman",
    eventName: "Global Spirituality Mahotsav",
    sessionName: "Global Spirituality Mahotsav",
    registrationId: "123456",
    pnr: "123456",
    checkinTime: Date.now(),
    uid: "user-1234",
    platform: "WEB",
  },
};

QRUserSuccessScreen.storyName = "QR Entry";
