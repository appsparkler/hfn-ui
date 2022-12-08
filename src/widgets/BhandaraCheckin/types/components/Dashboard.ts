import { ICheckinsAggregateData } from "@hfn-checkins/types";

export interface DashboardStateProps {
  stats: ICheckinsAggregateData;
  isFetching?: boolean;
}

export interface DashboardDispatchProps {
  onRefresh?: () => void;
  onReturn?: () => void;
}

export type DashboardProps = DashboardStateProps & DashboardDispatchProps;
