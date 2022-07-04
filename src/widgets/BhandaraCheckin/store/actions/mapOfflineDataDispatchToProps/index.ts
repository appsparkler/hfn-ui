import { MapDispatchToProps } from "react-redux";
import { OfflineDataDispatchProps } from "widgets/BhandaraCheckin/types/components/OfflineData";

export const mapOfflineDataDispatchToProps: MapDispatchToProps<
  OfflineDataDispatchProps,
  {}
> = (dispatch) => {
  return {
    onRefresh: () => {},
  };
};
