import { Batch } from "./Batch";

export interface ICheckinTileInfo {
  batch: Batch;
  checked: boolean;
  eventName: string;
  fullName: string;
  abhyasiId: string;
  regId: string;
  orderId: string;
  dormPreference?: string;
  berthPreference?: string;
  dormAllocation?: string;
}

export type ICheckinInfoTileStateProps = {} & ICheckinTileInfo;

export interface ICheckinInfoTileDispatchProps {
  onCheck: (registrationId: string, checked: boolean) => void;
  onChangeDormAllocation: (id: string, dormAllocation: string) => void;
}

export type TCheckinInfoTileProps = ICheckinInfoTileStateProps &
  ICheckinInfoTileDispatchProps;

export type CheckinInfoTileComponent = React.FC<TCheckinInfoTileProps>;
