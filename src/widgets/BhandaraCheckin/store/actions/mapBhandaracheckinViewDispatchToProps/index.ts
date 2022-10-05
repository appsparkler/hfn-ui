import { MapDispatchToProps } from "react-redux";
import { BhandaraCheckinViewDispatchProps } from "widgets/BhandaraCheckin/types";
import {
  signInAnonymously,
  signOutAnonymously,
} from "widgets/BhandaraCheckin/store/api-async-thunks";

export const mapBhandaraCheckinViewDispatchToProps: MapDispatchToProps<
  BhandaraCheckinViewDispatchProps,
  {}
> = (dispatch) => {
  return {
    onUnmount: async () => {
      dispatch<any>(signOutAnonymously());
    },
    onMount: async () => {
      dispatch<any>(signInAnonymously());
    },
  };
};
