import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useCallback, useState } from "react";
import { MultiCheckinScreenProps } from "widgets/BhandaraCheckin/types";
import { MultiCheckinScreen } from "./MultiCheckinScreen";

const Story = {
  component: MultiCheckinScreen,
  title: "Widgets/Bhandara Checkin/Sections/Multi Checkin Screen",
} as ComponentMeta<typeof MultiCheckinScreen>;

const Template: ComponentStory<typeof MultiCheckinScreen> = (args) => {
  const [$data, _setData] = useState<MultiCheckinScreenProps["userData"]>(
    args.userData
  );

  const handleChangeData = useCallback<MultiCheckinScreenProps["onChangeData"]>(
    (data) => {
      _setData(data);
      args.onChangeData(data);
    },
    [args]
  );

  return (
    <MultiCheckinScreen
      {...args}
      userData={$data}
      onChangeData={handleChangeData}
    />
  );
};

export const multiCheckinScreen: ComponentStory<typeof MultiCheckinScreen> =
  Template.bind({});
multiCheckinScreen.args = {
  eventInfo: {
    eventId: "383821",
    eventName: "Bhandara 2021",
    pnr: "AE-IDDK-IWQ",
  },
  userData: [
    {
      abhyasiId: "tile-1",
      fullName: "Jane Mathew",
      dormPreference: "East Comform Dorm - B1",
      birthPreference: "LB",
      checked: false,
      registrationId: "AAV1234",
    },
    {
      abhyasiId: "tile-2",
      fullName: "Shekhar Kapoor",
      dormPreference: "German Tent",
      birthPreference: "LB",
      checked: false,
      registrationId: "AAV1234",
    },
    {
      abhyasiId: "tile-3",
      registrationId: "BCD1234",
      fullName: "Shekhar Kapoor",
      dormPreference: "German Tent",
      birthPreference: "LB",
      checked: false,
    },
  ],
};

export default Story;
