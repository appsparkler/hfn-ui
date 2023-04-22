import { textStrings } from "widgets/BhandaraCheckin/constants";

export const FirestoreCollections = {
  CHECKINS: textStrings.getCheckinsCollectionPath(),
  META: "meta",
};

export interface ICheckinsMetaData {
  totalCheckins: number;
  emailOrMobileCheckins: number;
  QRCodeCheckins: number;
  abhyasiIdCheckins: number;
}
