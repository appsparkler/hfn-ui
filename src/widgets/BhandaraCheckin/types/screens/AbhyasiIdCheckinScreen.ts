import { TextFieldPropsOnChange } from "types";
import { Batch } from "../components";

export interface IAbhyasiIDCheckinScreenStateProps {
  abhyasiId: string;
  batch: Batch;
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
