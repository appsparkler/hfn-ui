import { TCheckinTileInfo } from "./CheckinInfoTile";

export interface ICheckinInfoTilesStateProps {
  data: TCheckinTileInfo[];
}

export interface ICheckinInfoTilesDispatchProps {}

export interface ICheckinInfoTilesProps
  extends ICheckinInfoTilesStateProps,
    ICheckinInfoTilesDispatchProps {}

export type CheckinInfoTilesComponent = React.FC<ICheckinInfoTilesProps>;
