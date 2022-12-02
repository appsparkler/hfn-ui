import { TCheckinTileInfo } from "./CheckinInfoTile";

export interface ICheckinInfoTilesStateProps {
  data: TCheckinTileInfo[];
}

export interface ICheckinInfoTilesDispatchProps {
  onChange: (data: TCheckinTileInfo[]) => void;
}

export interface ICheckinInfoTilesProps
  extends ICheckinInfoTilesStateProps,
    ICheckinInfoTilesDispatchProps {}

export type TCheckinInfoTilesComponent = React.FC<ICheckinInfoTilesProps>;
