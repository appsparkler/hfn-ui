import { IQREventInfo } from "..";
import { ICheckinTileInfo } from "../components";

export interface MultiCheckinScreenStateProps {
  userData: ICheckinTileInfo[];
  eventInfo: IQREventInfo;
}

export interface MultiCheckinScreenDispatchProps {
  onClickCheckin: () => void;
  onClickCancel: () => void;
  onChangeData: (data: ICheckinTileInfo[]) => void;
}

export type MultiCheckinScreenProps = MultiCheckinScreenStateProps &
  MultiCheckinScreenDispatchProps;

export type TMultiCheckinScreenComponent = React.FC<MultiCheckinScreenProps>;
