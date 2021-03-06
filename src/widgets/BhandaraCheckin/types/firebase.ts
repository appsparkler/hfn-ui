export const FirestoreCollections = {
  ABHYASI_ID_CHECKINS: "abhyasiId-checkins",
  OTHER_CHECKINS: "other-checkins",
  CHECKINS: `checkins-${process.env.REACT_APP_ENV}`,
};

export enum CheckinTypesEnum {
  AbhyasiId = "AbhyasiId",
  EmailOrMobile = "EmailOrMobile",
}
