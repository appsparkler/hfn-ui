import {
  LoaderFunction,
  RouteObject,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { appRoutes } from "../../model/data/routes";
import { ILocationState } from "v1/model/interfaces/ILocationState";
import { AbhyasiIdCheckinScreenConnected } from "v1/features/AbhyasiIdCheckinScreen/AbhyasiIdCheckinScreenConnected";
import { useEffect } from "react";
// import { store } from "v1/app/store";

const Component = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: ILocationState };
  useEffect(() => {
    if (!state) {
      navigate(appRoutes.MAIN_SCREEN);
    }
  }, [navigate, state, state.batch, state.inputValue]);
  return (
    <AbhyasiIdCheckinScreenConnected
      abhyasiId={state.inputValue}
      batchInitialValue={state.batch}
    />
  );
};

const loader: LoaderFunction = ({ params, request, context }) => {
  // console.log({ params, request, context });
  // debugger;
  return null;
};

export const abhyasiIdCheckinRouteObject: RouteObject = {
  path: appRoutes.ABHYASI_ID_CHECKIN,
  Component,
  loader,
};
