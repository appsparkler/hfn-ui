import { ReturnVoid } from "types";

export interface RefreshAppStateProps {}

export interface RefreshAppDispatchProps {
  onRefresh?: ReturnVoid;
  onCancel?: ReturnVoid;
}

export type RefreshAppProps = RefreshAppStateProps & RefreshAppDispatchProps;
