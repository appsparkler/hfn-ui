import { ModeSwitchDispatchProps } from "components";
import { ReturnVoid } from "types";
import { Env } from "../env";
import { Batch } from "./Batch";

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
  batch: Batch;
}

export interface SectionMainDispatchProps {
  onChangeBatch: (batch: Batch) => void;
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
