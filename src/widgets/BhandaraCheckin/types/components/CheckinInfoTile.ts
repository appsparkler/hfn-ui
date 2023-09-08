import { QRCodeCheckin } from "widgets/BhandaraCheckin/utils/QRCodeCheckin";

export type ICheckinInfoTileStateProps = {} & QRCodeCheckin;

export interface ICheckinInfoTileDispatchProps {
  onCheck: (registrationId: string, checked: boolean) => void;
  onChangeDormAllocation: (id: string, dormAllocation: string) => void;
}

export type TCheckinInfoTileProps = ICheckinInfoTileStateProps &
  ICheckinInfoTileDispatchProps;

export type CheckinInfoTileComponent = React.FC<TCheckinInfoTileProps>;
