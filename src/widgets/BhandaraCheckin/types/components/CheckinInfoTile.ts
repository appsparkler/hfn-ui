import { Batch } from "./Batch";

export interface ICheckinTileInfo {
  abhyasiId: string;
  batch: Batch;
  berthPreference?: string;
  checkin: boolean;
  dormAndBerthAllocation?: string;
  dormPreference?: string;
  eventName: string;
  fullName: string;
  orderId: string;
  pnr: string;
  regId: string;
  timestamp: number;
  type: string;
}

export type ICheckinInfoTileStateProps = {} & ICheckinTileInfo;

export interface ICheckinInfoTileDispatchProps {
  onCheck: (registrationId: string, checked: boolean) => void;
  onChangeDormAllocation: (id: string, dormAllocation: string) => void;
}

export type TCheckinInfoTileProps = ICheckinInfoTileStateProps &
  ICheckinInfoTileDispatchProps;

export type CheckinInfoTileComponent = React.FC<TCheckinInfoTileProps>;
