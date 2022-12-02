import { TCheckinTileInfo } from "../components";

export interface MultiCheckinScreenStateProps {
  data: TCheckinTileInfo[];
}

export interface MultiCheckinScreenDispatchProps {
  onClickCheckin: () => void;
  onClickCancel: () => void;
  onChangeData: (data: TCheckinTileInfo[]) => void;
}

export type MultiCheckinScreenProps = MultiCheckinScreenStateProps &
  MultiCheckinScreenDispatchProps;

export type TMultiCheckinScreenComponent = React.FC<MultiCheckinScreenProps>;
