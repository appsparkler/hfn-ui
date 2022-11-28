import { Vertical } from "components/Boxes";
import { CheckinInfoTile } from "./CheckinInfoTile";

export const CheckinInfoTiles: React.FC<{}> = () => {
  return (
    <Vertical gap={3} px={2}>
      {(
        [
          {
            id: "tile-1",
            fullName: "Jane Mathew",
            dormPreference: "East Comform Dorm - B1",
            birthPreference: "LB",
          },
          {
            id: "tile-2",
            fullName: "Shekhar Kapoor",
            dormPreference: "German Tent",
            birthPreference: "LB",
          },
          {
            id: "tile-3",
            fullName: "Shekhar Kapoor",
            dormPreference: "German Tent",
            birthPreference: "LB",
          },
        ] as any[]
      ).map((dataProps) => {
        return <CheckinInfoTile {...dataProps} />;
      })}
    </Vertical>
  );
};
