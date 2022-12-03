import { TextFieldPropsOnChange } from "types";

export interface IAbhyasiIDCheckinTileStateProps {
  abhyasiId: string;
}

export interface IAbhyasiIDCheckinTileDispatchProps {
  onCheckin: () => void;
  onCancel: () => void;
  onChangeDormAndBirthAllocation: TextFieldPropsOnChange;
}

export type TAbhyasiIDCheckinTileProps = IAbhyasiIDCheckinTileStateProps &
  IAbhyasiIDCheckinTileDispatchProps;

export type TAbhyasiIDCheckinTileComponentProps =
  React.FC<TAbhyasiIDCheckinTileProps>;
