export interface DashboardComponentStateProps {
  totalCheckins: number;
}

export interface DashboardComponentDispatchProps {
  onMount: () => void;
  onClickRefresh: () => void;
}

export type DashboardComponent = React.FC<
  DashboardComponentStateProps & DashboardComponentDispatchProps
>;
