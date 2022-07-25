import { CheckinsAggregateData } from "../aggregations";

export interface DashboardV0StateProps {
  password?: string;
  total?: number;
}

export interface DashboardV0DispatchProps {
  onRefresh?: () => void;
  onMount?: () => void;
  onReturn?: () => void;
}

export type DashboardV0Props = DashboardV0StateProps & DashboardV0DispatchProps;

export interface DashboardStateProps {
  stats: CheckinsAggregateData;
}

export interface DashboardDispatchProps {
  onRefresh?: () => void;
  onReturn?: () => void;
}

export type DashboardProps = DashboardStateProps & DashboardDispatchProps;
