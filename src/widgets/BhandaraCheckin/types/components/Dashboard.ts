export interface DashboardStateProps {
  password?: string;
}

export interface DashboardDispatchProps {
  onRefresh?: () => void;
  onMount?: () => void;
  onReturn?: () => void;
}

export type DashboardProps = DashboardStateProps & DashboardDispatchProps;
