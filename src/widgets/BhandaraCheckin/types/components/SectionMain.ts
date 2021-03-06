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
  isOfflineMode?: boolean;
}

export interface SectionMainDispatchProps {
  onChange: (updatedValue: string) => void;
  onClickStart: (userId: string) => void;
  onSwitchMode: ModeSwitchDispatchProps["onSwitch"];
  onClickScan: () => void;
  onSwitchScanner?: (checked: boolean) => void;
  onSwitchOfflineMode?: (checked: boolean) => void;
  onClickOfflineData?: () => void;
  onClickDashboard?: () => void;
  onMount?: () => void;
  onRefresh?: ReturnVoid;
}

export type SectionMainProps = SectionMainStateProps & SectionMainDispatchProps;
