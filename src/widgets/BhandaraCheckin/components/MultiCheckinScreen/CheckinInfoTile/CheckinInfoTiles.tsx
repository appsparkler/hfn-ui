import { Vertical } from "components/Boxes";
import { useCallback } from "react";
import {
  TCheckinInfoTilesComponent,
  ICheckinInfoTileDispatchProps,
} from "widgets/BhandaraCheckin/types";
import { CheckinInfoTile } from "./CheckinInfoTile";

export const CheckinInfoTiles: TCheckinInfoTilesComponent = ({
  data,
  onChange,
}) => {
  const handleCheck = useCallback<ICheckinInfoTileDispatchProps["onCheck"]>(
    (registrationId, checked) => {
      const newData = data.map((item) => {
        if (item.regId === registrationId) {
          return { ...item, checked };
        }
        return item;
      });
      onChange(newData);
    },
    [data, onChange]
  );

  const handleChangeDormAllocation = useCallback<
    ICheckinInfoTileDispatchProps["onChangeDormAllocation"]
  >(
    (registrationId, dormAllocation) => {
      const newData = data.map((item) => {
        if (item.regId === registrationId) {
          return { ...item, dormAllocation };
        }
        return item;
      });
      onChange(newData);
    },
    [data, onChange]
  );

  return (
    <Vertical gap={2}>
      {data.map((dataProps) => {
        return (
          <CheckinInfoTile
            {...dataProps}
            onCheck={handleCheck}
            onChangeDormAllocation={handleChangeDormAllocation}
          />
        );
      })}
    </Vertical>
  );
};
