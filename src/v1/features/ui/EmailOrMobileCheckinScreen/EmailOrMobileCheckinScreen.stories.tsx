import { ComponentMeta, ComponentStory } from "@storybook/react";
import { EmailOrMobileCheckinScreen } from "./EmailOrMobileCheckinScreen";

const Story = {
  component: EmailOrMobileCheckinScreen,
  title: "features/ui/EmailOrMobileCheckinScreen",
} as ComponentMeta<typeof EmailOrMobileCheckinScreen>;

const Template: ComponentStory<typeof EmailOrMobileCheckinScreen> = (args) => (
  <EmailOrMobileCheckinScreen />
);

export const EmailOrMobileCheckinScreenStory: ComponentStory<
  typeof EmailOrMobileCheckinScreen
> = Template.bind({});
EmailOrMobileCheckinScreenStory.args = {};
EmailOrMobileCheckinScreenStory.storyName = "Email Or Mobile Checkin Screen";

export default Story;