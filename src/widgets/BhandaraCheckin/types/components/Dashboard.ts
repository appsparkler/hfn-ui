export interface DashboardComponentStateProps {
  totalCheckins: number;
}

export interface DashboardComponentDispatchProps {
  onRefresh: () => void;
  onMount: () => void;
  onClickGoBack: () => void;
}

export type DashboardComponent = React.FC<
  DashboardComponentStateProps & DashboardComponentDispatchProps
>;
