import { PageEnum } from "..";
import { noop } from "lodash/fp";

export type BhandaraCheckinViewStateProps = {
  renderScanner?: boolean;
  page?: PageEnum;
};

export type BhandaraCheckinViewDispatchProps = {
  onMount?: typeof noop;
  onUnmount?: typeof noop;
};

export type BhandaraCheckinViewProps = BhandaraCheckinViewStateProps &
  BhandaraCheckinViewDispatchProps;