import { ModeSwitchDispatchProps } from "components";
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
}

export interface SectionMainDispatchProps {
  onChange: (updatedValue: string) => void;
  onClickStart: (userId: string) => void;
  onSwitchMode: ModeSwitchDispatchProps["onSwitch"];
  onClickDashboard: () => void;
  onClickScan: () => void;
  onSwitchScanner?: (checked: boolean) => void;
  onMount?: () => void;
  onRefresh?: ReturnVoid;
}

export type SectionMainProps = SectionMainStateProps & SectionMainDispatchProps;
