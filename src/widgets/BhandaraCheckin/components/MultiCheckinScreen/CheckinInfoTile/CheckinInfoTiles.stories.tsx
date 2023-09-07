import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { useCallback } from "react";
import { ICheckinInfoTilesProps } from "widgets/BhandaraCheckin/types";
import { CheckinInfoTiles } from "./CheckinInfoTiles";

const Story = {
  component: CheckinInfoTiles,
  title:
    "widgets/Bhandara Checkin/Sections/Multi Checkin Screen/Checkin Info Tiles",
} as ComponentMeta<typeof CheckinInfoTiles>;

const Template: ComponentStory<typeof CheckinInfoTiles> = (args) => {
  const [$data, setData] = React.useState<ICheckinInfoTilesProps["data"]>(
    args.data
  );
  const handleChange = useCallback<ICheckinInfoTilesProps["onChange"]>(
    (updatedData) => {
      setData(updatedData);
      args.onChange(updatedData);
    },
    [args]
  );
  return <CheckinInfoTiles data={$data} onChange={handleChange} />;
};

export const checkinInfoTiles: ComponentStory<typeof CheckinInfoTiles> =
  Template.bind({});
checkinInfoTiles.args = {
  data: [
    {
      abhyasiId: "tile-1",
      checked: false,
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
      checked: false,
      batch: "batch-1",
      eventName: "2023 Birth Anniversary Celebrations of Pujya Daaji",
      orderId: "Bhandara Sept 2023",
      fullName: "Shekhar Kapoor",
      dormPreference: "German Tent",
      berthPreference: "LB",
      regId: "AAV2314",
    },
    {
      abhyasiId: "tile-3",
      checked: false,
      batch: "batch-1",
      eventName: "2023 Birth Anniversary Celebrations of Pujya Daaji",
      orderId: "Bhandara Sept 2023",
      fullName: "Shekhar Kapoor",
      dormPreference: "German Tent",
      berthPreference: "LB",
      regId: "A32sde34",
    },
  ],
};

export default Story;
