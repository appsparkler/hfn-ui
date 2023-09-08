import { QRCodeCheckin } from "widgets/BhandaraCheckin/utils/QRCodeCheckin";
import { IQREventInfo } from "..";

export interface MultiCheckinScreenStateProps {
  userData: QRCodeCheckin[];
  more: string;
  eventInfo: IQREventInfo;
}

export interface MultiCheckinScreenDispatchProps {
  onClickCheckin: () => void;
  onClickCancel: () => void;
  onChangeData: (data: QRCodeCheckin[]) => void;
}

export type MultiCheckinScreenProps = MultiCheckinScreenStateProps &
  MultiCheckinScreenDispatchProps;

export type TMultiCheckinScreenComponent = React.FC<MultiCheckinScreenProps>;
