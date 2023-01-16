import { TextFieldPropsOnChange } from "types";

export interface IAbhyasiIDCheckinScreenStateProps {
  abhyasiId: string;
  dormAndBerthAllocation: string;
}

export interface IAbhyasiIDCheckinScreenDispatchProps {
  onCheckin: () => void;
  onCancel: () => void;
  onChangeDormAndBerthAllocation: TextFieldPropsOnChange;
}

export type TAbhyasiIDCheckinScreenProps = IAbhyasiIDCheckinScreenStateProps &
  IAbhyasiIDCheckinScreenDispatchProps;

export type TAbhyasiIDCheckinScreenComponentProps =
  React.FC<TAbhyasiIDCheckinScreenProps>;
