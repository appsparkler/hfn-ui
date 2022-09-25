import { PageEnum } from "../routing";

export type BhandaraCheckinViewStateProps = {
  renderApp?: boolean;
  renderScanner?: boolean;
  page?: PageEnum;
};

export interface BhandaraCheckinViewActionProps {
  onMount?: () => void;
  onUnmount?: () => void;
}

export type BhandaraCheckinViewProps = BhandaraCheckinViewStateProps &
  BhandaraCheckinViewActionProps;
