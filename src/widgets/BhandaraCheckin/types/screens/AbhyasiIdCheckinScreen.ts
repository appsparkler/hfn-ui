import { TextFieldPropsOnChange } from "types";

export interface IAbhyasiIDCheckinScreenStateProps {
  abhyasiId: string;
  dormAndBirthAllocation: string;
}

export interface IAbhyasiIDCheckinScreenDispatchProps {
  onCheckin: () => void;
  onCancel: () => void;
  onChangeDormAndBirthAllocation: TextFieldPropsOnChange;
}

export type TAbhyasiIDCheckinScreenProps = IAbhyasiIDCheckinScreenStateProps &
  IAbhyasiIDCheckinScreenDispatchProps;

export type TAbhyasiIDCheckinScreenComponentProps =
  React.FC<TAbhyasiIDCheckinScreenProps>;
