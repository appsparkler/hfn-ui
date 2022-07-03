import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import {
  SectionCheckinSuccess,
  SectionCheckinStateProps,
  SectionCheckinDispatchProps,
} from "./SectionCheckInSuccess";
import { resetAppState, RootState } from "../../store";
import { pageActions } from "widgets/BhandaraCheckin/routing";

const mapStateToProps: MapStateToProps<
  SectionCheckinStateProps,
  {},
  RootState
> = (rootState) => ({
  enableConfetti: !rootState.mainSection.isScannerOn,
});

const mapDispatchToProps: MapDispatchToProps<SectionCheckinDispatchProps, {}> =
  (dispatch) => {
    return {
      onClickReturn: () => {
        dispatch<any>(resetAppState());
        dispatch<any>(pageActions.HOME());
      },
    };
  };

export const SectionCheckinSuccessConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionCheckinSuccess);
