import { FormControlLabelProps, TextFieldProps } from "@mui/material";

export interface TCheckinTileInfo {
  fullName: string;
  id: string;
  dormPreference: string;
  birthPreference: string;
}

export type ICheckinInfoTileStateProps = {} & TCheckinTileInfo;

interface ICheckinInfoTileDispatchProps {
  onCheck: FormControlLabelProps["onChange"];
  onChangeDormAllocation: TextFieldProps["onChange"];
}

type TCheckinInfoTileProps = ICheckinInfoTileStateProps &
  ICheckinInfoTileDispatchProps;

export type CheckinInfoTileProps = React.FC<TCheckinInfoTileProps>;
