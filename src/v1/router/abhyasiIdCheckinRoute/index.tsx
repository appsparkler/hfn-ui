import { RouteObject, useLocation } from "react-router-dom";
import { appRoutes } from "../../model/data/routes";
import { AbhyasiIdCheckinScreen } from "v1/features/AbhyasiIdCheckinScreen/AbhyasiIdCheckinScreen";
import { useEffect } from "react";

const Component = () => {
  const { state } = useLocation();
  useEffect(() => {
    alert(state);
  }, [state]);
  return (
    <AbhyasiIdCheckinScreen
      abhyasiId=""
      batchInitialValue={""}
      onChangeBatch={function (selectedBatch: string): void {
        throw new Error("Function not implemented.");
      }}
      onChangeDormAndBerthAllocation={function (
        dormAndBerthAllocation: string
      ): void {
        throw new Error("Function not implemented.");
      }}
      onClickCancel={function (): void {
        throw new Error("Function not implemented.");
      }}
      onClickCheckin={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};

export const abhyasiIdCheckinRouteObject: RouteObject = {
  path: appRoutes.ABHYASI_ID_CHECKIN,
  Component,
};
