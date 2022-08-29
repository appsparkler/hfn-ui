import { CheckinsAggregateData } from "../aggregations";

export interface DashboardStateProps {
  stats: CheckinsAggregateData;
}

export interface DashboardDispatchProps {
  onRefresh?: () => void;
  onReturn?: () => void;
}

export type DashboardProps = DashboardStateProps & DashboardDispatchProps;
