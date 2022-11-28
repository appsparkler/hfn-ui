import { Vertical } from "components/Boxes";
import { TCheckinTileInfo } from "types";
import { CheckinInfoTile } from "./CheckinInfoTile";

export interface ICheckinInfoTilesStateProps {
  data: TCheckinTileInfo[];
}

export interface ICheckinInfoTilesDispatchProps {}

export interface ICheckinInfoTilesProps
  extends ICheckinInfoTilesStateProps,
    ICheckinInfoTilesDispatchProps {}

export const CheckinInfoTiles: React.FC<ICheckinInfoTilesProps> = ({
  data,
}) => {
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
