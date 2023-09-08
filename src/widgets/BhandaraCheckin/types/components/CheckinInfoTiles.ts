import { QRCodeCheckin } from "widgets/BhandaraCheckin/utils/QRCodeCheckin";

export interface ICheckinInfoTilesStateProps {
  data: QRCodeCheckin[];
}

export interface ICheckinInfoTilesDispatchProps {
  onChange: (data: QRCodeCheckin[]) => void;
}

export interface ICheckinInfoTilesProps
  extends ICheckinInfoTilesStateProps,
    ICheckinInfoTilesDispatchProps {}

export type TCheckinInfoTilesComponent = React.FC<ICheckinInfoTilesProps>;
