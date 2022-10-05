import { PageEnum } from "../routing";

export type BhandaraCheckinStateProps = {
  renderApp?: boolean;
  renderScanner?: boolean;
  page?: PageEnum;
};

export interface BhandaraCheckinDispatchProps {
  onMount?: () => void;
  onUnmount?: () => void;
}

export type BhandaraCheckinViewProps = BhandaraCheckinStateProps &
  BhandaraCheckinDispatchProps;
