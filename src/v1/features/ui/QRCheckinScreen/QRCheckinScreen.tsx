import { CardWithClickableHeader } from "../components/CardWithHeader/CardWithHeader";
import { ScreenWrapper } from "../components/ScreenWrapper/ScreenWrapper";

const QRCheckinCard: React.FC<{}> = () => {
  return (
    <CardWithClickableHeader
      onClickHeader={() => {}}
      heading="Ravi Balla"
      isSelected={true}
    >
      The qr details
    </CardWithClickableHeader>
  );
};

export const QRCheckinScreen: React.FC<{}> = () => {
  return (
    <ScreenWrapper>
      <QRCheckinCard />
    </ScreenWrapper>
  );
};
