import {
  ModeSwitchDispatchProps,
  OptionValue,
  SelectFieldOption,
} from "components";
import { ReturnVoid } from "types";
import { Env } from "../env";

export interface SectionMainStateProps {
  env?: Env;
  error?: boolean;
  helperText?: string;
  value: string;
  isProcessing?: boolean;
  isDarkMode?: boolean;
  isScannerOn?: boolean;
  scanBtnDisabled?: boolean;
  scanBtnProcessing?: boolean;
  batches: SelectFieldOption[];
  selectedBatch: OptionValue;
}

export interface SectionMainDispatchProps {
  onChange: (updatedValue: string) => void;
  onClickStart: (userId: string) => void;
  onSwitchMode: ModeSwitchDispatchProps["onSwitch"];
  onClickScan: () => void;
  onSwitchScanner?: (checked: boolean) => void;
  onClickOfflineData?: () => void;
  onClickDashboard?: () => void;
  onMount?: () => void;
  onRefresh?: ReturnVoid;
  onChangeBatch: (name: string, value: OptionValue) => void;
}

export type SectionMainProps = SectionMainStateProps & SectionMainDispatchProps;
