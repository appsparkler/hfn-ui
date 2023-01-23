export const FirestoreCollections = {
  ABHYASI_ID_CHECKINS: "abhyasiId-checkins",
  OTHER_CHECKINS: "other-checkins",
  CHECKINS: "checkins",
  META: "meta",
};

export interface ICheckinsMetaData {
  totalCheckins: number;
  emailOrMobileCheckins: number;
  QRCodeCheckins: number;
  abhyasiIdCheckins: number;
}
