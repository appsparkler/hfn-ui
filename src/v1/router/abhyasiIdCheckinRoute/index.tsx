import {
  LoaderFunction,
  RouteObject,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { appRoutes } from "../../model/data/routes";
import { ILocationState } from "v1/model/interfaces/ILocationState";
import { AbhyasiIdCheckinScreenConnected } from "v1/features/AbhyasiIdCheckinScreen/AbhyasiIdCheckinScreenConnected";

const Component = () => {
  const { state } = useLocation() as { state: ILocationState };
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(appRoutes.MAIN_SCREEN);
  };
  const handleCheckin = () => {
    navigate(appRoutes.SUCCESS_SCREEN);
  };
  return (
    <AbhyasiIdCheckinScreenConnected
      abhyasiId={state.inputValue}
      batchInitialValue={state.batch}
      onClickCancel={handleCancel}
      onCheckin={handleCheckin}
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
