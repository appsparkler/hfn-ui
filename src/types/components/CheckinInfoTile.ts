import { FormControlLabelProps, TextFieldProps } from "@mui/material";

export interface TCheckinTileInfo {
  checked: boolean;
  fullName: string;
  id: string;
  dormPreference: string;
  birthPreference: string;
}

export type ICheckinInfoTileStateProps = {} & TCheckinTileInfo;

type TextFieldChangeHandler = NonNullable<TextFieldProps["onChange"]>;

type FormControlLabelChangeHandler = NonNullable<
  FormControlLabelProps["onChange"]
>;

export interface ICheckinInfoTileDispatchProps {
  onCheck: (id: string, checked: boolean) => void;
  onChangeDormAllocation: TextFieldChangeHandler;
}

export type TCheckinInfoTileProps = ICheckinInfoTileStateProps &
  ICheckinInfoTileDispatchProps;

export type CheckinInfoTileComponent = React.FC<TCheckinInfoTileProps>;
