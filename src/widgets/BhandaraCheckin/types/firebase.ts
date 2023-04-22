import { batchName } from "../constants";

export const FirestoreCollections = {
  CHECKINS: `events/${batchName}/checkins`,
  META: "meta",
};

export interface ICheckinsMetaData {
  totalCheckins: number;
  emailOrMobileCheckins: number;
  QRCodeCheckins: number;
  abhyasiIdCheckins: number;
}
