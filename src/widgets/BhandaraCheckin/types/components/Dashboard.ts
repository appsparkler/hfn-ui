import { CheckinsAggregateData } from "@hfn-checkins/types";

export interface DashboardStateProps {
  stats: CheckinsAggregateData;
  isFetching?: boolean;
}

export interface DashboardDispatchProps {
  onRefresh?: () => void;
  onReturn?: () => void;
}

export type DashboardProps = DashboardStateProps & DashboardDispatchProps;
