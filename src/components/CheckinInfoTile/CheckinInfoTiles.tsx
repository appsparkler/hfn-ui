import { Vertical } from "components/Boxes";
import { useCallback } from "react";
import {
  CheckinInfoTilesComponent,
  ICheckinInfoTileDispatchProps,
} from "types";
import { CheckinInfoTile } from "./CheckinInfoTile";

export const CheckinInfoTiles: CheckinInfoTilesComponent = ({
  data,
  onChange,
}) => {
  const handleCheck = useCallback<ICheckinInfoTileDispatchProps["onCheck"]>(
    (id, checked) => {
      const newData = data.map((item) => {
        if (item.id === id) {
          return { ...item, checked };
        }
        return item;
      });
      onChange(newData);
    },
    [data, onChange]
  );
  return (
    <Vertical gap={3} px={2}>
      {data.map((dataProps) => {
        return (
          <CheckinInfoTile
            {...dataProps}
            onCheck={handleCheck}
            onChangeDormAllocation={console.log}
          />
        );
      })}
    </Vertical>
  );
};
