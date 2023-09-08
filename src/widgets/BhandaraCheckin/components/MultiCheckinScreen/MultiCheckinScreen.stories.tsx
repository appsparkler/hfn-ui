import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useCallback, useState } from "react";
import {
  MultiCheckinScreenProps,
  PNRType,
} from "widgets/BhandaraCheckin/types";
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
    orderId: "383821",
    eventName: "Bhandara 2021",
    pnr: "AE-IDDK-IWQ",
    pnrType: PNRType.PAID_ACCOMODATION,
  },
  userData: [
    {
      abhyasiId: "tile-1",
      pnr: "ABEU-JIW-JWWW",
      timestamp: Date.now(),
      type: "QR",
      checkin: false,
      batch: "batch-1",
      eventName: "2023 Birth Anniversary Celebrations of Pujya Daaji",
      orderId: "Bhandara Sept 2023",
      fullName: "Jane Mathew",
      dormPreference: "East Comform Dorm - B1",
      berthPreference: "LB",
      regId: "AAV1234",
    },
    {
      abhyasiId: "tile-2",
      batch: "batch-1",
      pnr: "ABEU-JIW-JWWW",
      timestamp: Date.now(),
      type: "QR",
      eventName: "2023 Birth Anniversary Celebrations of Pujya Daaji",
      orderId: "Bhandara Sept 2023",
      fullName: "Shekhar Kapoor",
      dormPreference: "German Tent",
      berthPreference: "LB",
      checkin: false,
      regId: "AAV1234",
    },
    {
      abhyasiId: "tile-3",
      batch: "batch-1",
      pnr: "ABEU-JIW-JWWW",
      timestamp: Date.now(),
      type: "QR",
      eventName: "2023 Birth Anniversary Celebrations of Pujya Daaji",
      orderId: "Bhandara Sept 2023",
      regId: "BCD1234",
      fullName: "Shekhar Kapoor",
      dormPreference: "German Tent",
      berthPreference: "LB",
      checkin: false,
    },
  ],
};

export default Story;
