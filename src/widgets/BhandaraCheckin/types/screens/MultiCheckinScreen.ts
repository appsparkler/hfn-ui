import { IQREventInfo } from "..";
import { TCheckinTileInfo } from "../components";

export interface MultiCheckinScreenStateProps {
  userData: TCheckinTileInfo[];
  eventInfo: IQREventInfo;
}

export interface MultiCheckinScreenDispatchProps {
  onClickCheckin: () => void;
  onClickCancel: () => void;
  onChangeData: (data: TCheckinTileInfo[]) => void;
}

export type MultiCheckinScreenProps = MultiCheckinScreenStateProps &
  MultiCheckinScreenDispatchProps;

export type TMultiCheckinScreenComponent = React.FC<MultiCheckinScreenProps>;
