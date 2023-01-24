export const FirestoreCollections = {
  CHECKINS: "checkins",
  META: "meta",
};

export interface ICheckinsMetaData {
  totalCheckins: number;
  emailOrMobileCheckins: number;
  QRCodeCheckins: number;
  abhyasiIdCheckins: number;
}
