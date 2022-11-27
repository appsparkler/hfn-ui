import { CheckinInfoTile } from "./CheckinInfoTile";

export const CheckinInfoTiles: React.FC<{}> = () => {
  return (
    <>
      {([] as any[]).map((dataProps) => {
        return <CheckinInfoTile {...dataProps} />;
      })}
    </>
  );
};
