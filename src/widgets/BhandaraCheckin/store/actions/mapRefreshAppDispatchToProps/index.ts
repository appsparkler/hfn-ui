import { MapDispatchToProps } from "react-redux";
import { register } from "serviceWorkerRegistration";
import { HOME } from "widgets/BhandaraCheckin/routing/actions/page";
import { RefreshAppDispatchProps } from "widgets/BhandaraCheckin/types";

export const mapRefreshAppDispatchToProps: MapDispatchToProps<
  RefreshAppDispatchProps,
  {}
> = (dispatch) => {
  return {
    onCancel: () => {
      dispatch(HOME());
    },
    onRefresh: async () => {
      if (navigator.onLine) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        const unregistrationPromises = registrations.map((registration) =>
          registration.unregister()
        );
        await Promise.all(unregistrationPromises);
        register();
        dispatch(HOME());
        window.location.reload();
      } else {
        alert("You do not seem to have a stable internet connection.");
      }
    },
  };
};
