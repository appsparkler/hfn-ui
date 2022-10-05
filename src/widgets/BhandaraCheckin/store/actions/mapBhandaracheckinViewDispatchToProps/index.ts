import { MapDispatchToProps } from "react-redux";
import { getDashboardData } from "widgets/BhandaraCheckin/store/api-async-thunks";
import { HOME } from "widgets/BhandaraCheckin/routing/actions/page";
import { BhandaraCheckinViewDispatchProps } from "widgets/BhandaraCheckin/types";
import { dashboardActions } from "../../slices";

export const mapBhandaraCheckinViewDispatchToProps: MapDispatchToProps<
  BhandaraCheckinViewDispatchProps,
  {}
> = (dispatch) => {
  return {
    onUnmount: async () => {},
    onMount: async () => {},
  };
};

// const auth = getAuth();
// signInAnonymously(auth)
//   .then(({ user }) => {
//     console.log(user);
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.error(errorCode, errorMessage);
//   });

// return () => {
//   signOut(auth);
// };
