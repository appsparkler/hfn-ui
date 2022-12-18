export interface ICheckinTileInfo {
  checked: boolean;
  fullName: string;
  abhyasiId: string;
  registrationId: string;
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
