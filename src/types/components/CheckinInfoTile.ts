export interface TCheckinTileInfo {
  checked: boolean;
  fullName: string;
  id: string;
  dormPreference: string;
  birthPreference: string;
}

export type ICheckinInfoTileStateProps = {} & TCheckinTileInfo;

export interface ICheckinInfoTileDispatchProps {
  onCheck: (id: string, checked: boolean) => void;
  onChangeDormAllocation: (id: string, dormAllocation: string) => void;
}

export type TCheckinInfoTileProps = ICheckinInfoTileStateProps &
  ICheckinInfoTileDispatchProps;

export type CheckinInfoTileComponent = React.FC<TCheckinInfoTileProps>;
