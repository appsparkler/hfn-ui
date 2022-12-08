import { ICheckinTileInfo } from "./CheckinInfoTile";

export interface ICheckinInfoTilesStateProps {
  data: ICheckinTileInfo[];
}

export interface ICheckinInfoTilesDispatchProps {
  onChange: (data: ICheckinTileInfo[]) => void;
}

export interface ICheckinInfoTilesProps
  extends ICheckinInfoTilesStateProps,
    ICheckinInfoTilesDispatchProps {}

export type TCheckinInfoTilesComponent = React.FC<ICheckinInfoTilesProps>;
