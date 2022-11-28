import { Vertical } from "components/Boxes";
import { CheckinInfoTilesComponent } from "types";
import { CheckinInfoTile } from "./CheckinInfoTile";

export const CheckinInfoTiles: CheckinInfoTilesComponent = ({ data }) => {
  return (
    <Vertical gap={3} px={2}>
      {data.map((dataProps) => {
        return (
          <CheckinInfoTile
            {...dataProps}
            onCheck={console.log}
            onChangeDormAllocation={console.log}
          />
        );
      })}
    </Vertical>
  );
};
